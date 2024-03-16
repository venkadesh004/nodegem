import { GoogleGenerativeAI, GenerativeModel, HarmCategory, HarmBlockThreshold, HarmProbability, FunctionCall, GenerateContentResult } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { google } from "googleapis";

import { authenticate } from "@google-cloud/local-auth";
import { v2 } from "@google-cloud/translate";

import { ModelConfig } from "./types";
import { Translate } from "@google-cloud/translate/build/src/v2";

const nodemailer = require('nodemailer');

import axios, { AxiosResponse } from "axios";

export class NodeGem {
    private API_KEY: string;
    private modelName: string;
    private currentModel: GenerativeModel;
    private maxOutputTokens: number = 100;
    private stopSequence: string[] = ["red"];
    private temperature: number = 0.9;
    private topP: number = 0.1;
    private topK: number = 16;
    safetySettings: any;
    private jwtClient: any;
    private authConnect: any;
    private gmail: any;
    private translate: Translate = new v2.Translate();
    private bloggerAPIKey!: string;

    constructor(API_KEY: string, modelName: string) {
        this.API_KEY = API_KEY;
        this.modelName = modelName;
        this.currentModel = new GoogleGenerativeAI(this.API_KEY).getGenerativeModel({ model: this.modelName });
    }

    async generateContent(prompt: string, stream: boolean): Promise<string> {
        if (this.modelName !== "gemini-pro") {
            return "Use Gemini pro";
        }
        if (stream) {
            const result = await this.currentModel.generateContentStream(prompt);
            const response = await result.response;
            return response.text();
        }
        const result = await this.currentModel.generateContent(prompt);
        const response = await result.response;
        return response.text();
    }

    fileToGenerativePart(path: string, mimeType: string) {
        return {
            inlineData: {
                data: Buffer.from(fs.readFileSync(path)).toString('base64'),
                mimeType: mimeType
            }
        };
    }

    async useTextAndImage(imageParts: string[][], stream: boolean, prompt: string): Promise<string> {
        if (this.modelName === "gemini-pro") {
            return "use Gemini pro Vision";
        }
        var newImageParts: any[] = [];
        imageParts.forEach(element => {
            newImageParts.push(this.fileToGenerativePart(element[0], element[1]));
        });
        if (stream) {
            const result = await this.currentModel.generateContentStream([prompt, ...newImageParts]);
            const response = await result.response;
            return response.text();
        }
        const result = await this.currentModel.generateContent([prompt, ...newImageParts]);
        const response = await result.response;
        return response.text();
    }

    changeConfig({ maxOutputTokens, temperature, topP, topK, stopSequence }: ModelConfig) {
        this.maxOutputTokens = maxOutputTokens;
        this.temperature = temperature;
        this.topK = topK;
        this.topP = topP;
        this.stopSequence = stopSequence;
        const generationConfig = {
            maxOuptutTokens: this.maxOutputTokens,
            stopSequences: this.stopSequence,
            temperature: this.temperature,
            topK: this.topK,
            topP: this.topP
        };
        this.currentModel = new GoogleGenerativeAI(this.API_KEY).getGenerativeModel({ model: this.modelName, generationConfig });
    }

    changeSafetySettings(input: Map<string, string>) {
        this.safetySettings = input;
        this.currentModel = new GoogleGenerativeAI(this.API_KEY).getGenerativeModel({ model: this.modelName, safetySettings: this.safetySettings });
    }

    async loadSavedCredentialsIfExist(token_path: string) {
        try {
            const content = (await fs.promises.readFile(token_path)).toLocaleString();
            const credentials = JSON.parse(content);
            return google.auth.fromJSON(credentials);
        } catch (err) {
            return null;
        }
    }

    async connectServiceAccount(clientKey: string, keyFile: string, privateKey: string, scopes: string[]): Promise<void> {
        this.jwtClient = new google.auth.JWT(
            clientKey,
            keyFile,
            privateKey,
            scopes
        );
        await this.jwtClient.authorize();
    }

    async saveCredentials(client: any, credentials_path: string, token_path: string): Promise<void> {
        const content = (await fs.promises.readFile(credentials_path)).toLocaleString();
        const keys = JSON.parse(content);
        const key = keys.installed || keys.web;
        const payload = JSON.stringify({
            type: 'authorized_user',
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        });
        await fs.promises.writeFile(token_path, payload);
    }

    async connectAuthClient(token_path: string, credentials_path: string, scopes: string[]): Promise<void> {
        this.authConnect = await this.loadSavedCredentialsIfExist(token_path);
        if (this.authConnect) {
            this.gmail = google.gmail({ version: 'v1', auth: this.authConnect });
            return;
        }
        this.authConnect = await authenticate({
            scopes: scopes,
            keyfilePath: credentials_path,
        });
        // console.log(this.authConnect.credentials);
        if (this.authConnect.credentials) {
            this.gmail = google.gmail({ version: 'v1', auth: this.authConnect });
            await this.saveCredentials(this.authConnect, credentials_path, token_path);
        }
    }

    async listFiles(pageSize: number): Promise<string[][] | null | undefined> {
        const drive = google.drive({ version: "v3", auth: this.jwtClient });
        const res = await drive.files.list({
            pageSize: pageSize,
            fields: 'nextPageToken, files(id, name)'
        });
        const files = res.data.files;
        if (files?.length === 0) {
            console.log("No files Found!");
            return process.exit();
        }
        var list: string[][] = [];
        files?.map((file) => {
            list.push([file.name!, file.id!]);
            // console.log(`${file.name} (${file.id})`);
        });
        return list;
    }

    async uploadFile(fileName: string): Promise<string | null | undefined> {
        const drive = google.drive({ version: 'v3', auth: this.jwtClient });

        if (fileName) {
            const file = await drive.files.create({
                media: {
                    body: fs.createReadStream(fileName)
                },
                fields: 'id',
                requestBody: {
                    name: path.basename(fileName),
                },
            });
            return file.data.id;
        }
        else
            return "Please specify a file Name";

    }

    async updateFile(fileName: string, fileId: string): Promise<string | null | undefined> {
        const drive = google.drive({ version: 'v3', auth: this.jwtClient });

        if (fileName && fileId) {
            const file = await drive.files.update({
                media: {
                    body: fs.createReadStream(fileName),
                },
                fileId: fileId,
            });

            return file.data.id;
        }
        else
            return "Please specify file name/file id";

    }

    async downloadFile(fileName: string, fileId: string, listenerFunction: any): Promise<any> {
        const drive = google.drive({ version: 'v3', auth: this.jwtClient });

        if (fileName && fileId) {
            let dest = fs.createWriteStream(fileName);
            drive.files.get(
                { fileId: fileId, alt: "media" },
                { responseType: "stream" },
                (err, response) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    response?.data
                        .on("end", listenerFunction)
                        .on("error", (err: any) => {
                            console.log(err);
                            return process.exit();
                        })
                        .pipe(dest);
                }
            );
        }
        else
            return "Please specify file name/file id";
    }

    async driveAndPrompt(prompt: string, fileName: string, fileId: string): Promise<string | null> {
        if (this.modelName === "google-pro") {
            return "Use Gemini Pro Vision";
        }
        const drive = google.drive({ version: 'v3', auth: this.jwtClient });

        if (fileName && fileId) {
            return new Promise(
                (resolve, reject) => {
                    const chunks: Uint8Array[] = [];
                    drive.files.get(
                        { fileId: fileId, alt: "media" },
                        { responseType: "stream" },
                        (err, response) => {
                            if (err) {
                                console.log(err);
                                return process.exit();
                            }
                            response?.data
                                .on('data', (chunk) => chunks.push(Buffer.from(chunk)))
                                .on('error', () => {
                                    console.log(err);
                                    reject(process.exit());
                                })
                                .on('end', async () => {
                                    let imagePart = [{
                                        inlineData: {
                                            data: Buffer.concat(chunks).toString('base64'),
                                            mimeType: 'image/png'
                                        }
                                    }];
                                    const result = await this.currentModel.generateContent([prompt, ...imagePart]);
                                    resolve(result.response.text());
                                });
                        }
                    );

                }
            );
        }
        else
            return "Please specify file name/file id";
    }

    async returnImageBuffer(fileName: string, fileId: string): Promise<Buffer | string> {
        const drive = google.drive({ version: "v3", auth: this.jwtClient });

        if (fileName && fileId) {
            return new Promise((resolve, reject) => {
                const chunks: Uint8Array[] = [];
                drive.files.get(
                    { fileId: fileId, alt: "media" },
                    { responseType: 'stream' },
                    (err, response) => {
                        if (err) {
                            reject(err);
                        }
                        response?.data
                            .on('data', (chunk) => chunks.push(Buffer.from(chunk)))
                            .on('error', () => {
                                resolve("Error");
                            })
                            .on('end', () => {
                                resolve(Buffer.concat(chunks).toString('base64'));
                            })
                    }
                );
            });
        }
        else
            return "Please specify file name/file id";
    }

    async returnSnippet(userId: string, maxResult: number): Promise<string[]> {
        if (this.gmail === undefined) {
            console.log("Mail is Not defined");
            return process.exit();
        }
        const mails = (await this.gmail.users.messages.list({ userId: userId, maxResults: maxResult }))?.data?.messages;
        if (mails !== undefined) {
            var listSnippets = [];
            for (const message of mails) {
                const msg = this.gmail.users.messages.get({
                    userId: userId,
                    id: message.id!
                });
                listSnippets.push((await msg).data.snippet);
            }
            return listSnippets;
        } else {
            return [];
        }
    }


    async promptSnippet(userId: string, snippetID: string, prompt: string): Promise<string> {
        if (this.gmail === undefined) {
            console.log("Mail is Not defined");
            return process.exit();
        }
        if (this.modelName === "gemini-pro-vision") {
            console.log("Use Gemini Pro");
            return process.exit();
        }
        return new Promise((resolve, reject) => {
            const msg = this.gmail.users.messages.get({
                userId: userId,
                id: snippetID
            }).then(async (result: any) => {
                // console.log(result);
                const output = this.currentModel.generateContent([prompt, result.data.snippet]);
                resolve((await output).response.text());
            }).catch((err: any) => {
                console.log(err);
                reject(err);
            });
        });
    }

    async sendMail(from: string, to: string, subject: string, text: string, html: string, name: string, prompt: string) {


        if (this.modelName === "gemini-pro-vision") {
            return "Use gemini-pro";
        }

        const oAuth2Client = new google.auth.OAuth2(
            this.authConnect._clientId,
            this.authConnect._clientSecret,
            this.authConnect.redirectUri
        );
        oAuth2Client.setCredentials({ refresh_token: this.authConnect._refreshToken });

        try {
            const accessToken = await oAuth2Client.getAccessToken();

            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'yours authorised email address',
                    clientId: this.authConnect._clientId,
                    clientSecret: this.authConnect._clientSecret,
                    refreshToken: this.authConnect._refreshToken,
                    accessToken: accessToken,
                },
            });

            const result: GenerateContentResult = await this.currentModel.generateContent([prompt, text]);
            const data = result.response.text();

            const mailOptions = {
                from: `${name} <${from}>`,
                to: `${to}`,
                subject: `${subject}`,
                text: `${data}`,
                html: `${html}`,
            };

            console.log(mailOptions);

            const output = await transport.sendMail(mailOptions);
            return output;
        } catch (error) {
            return error;
        }
    }

    async translateText(text: any, targetLang: string) {
        let [translations] = await this.translate.translate(text, targetLang);
        return translations;
    }

    async getBlogData(API_KEY: string, bloggerID: string): Promise<AxiosResponse | any> {
        this.bloggerAPIKey = API_KEY;
        const result = await axios.get(`https://www.googleapis.com/blogger/v3/blogs/${bloggerID}?key=${API_KEY}`);
        return result.data;
    }

    async generateBlogContent(prompt: string | string[]) {
        const result = await this.currentModel.generateContent(prompt);
        return result.response.text();
    }

    async getBlogContent(API_KEY: string, bloggerID: string, doPrompt: boolean, prompt: string): Promise<AxiosResponse | any> {
        this.bloggerAPIKey = API_KEY;
        const result = await axios.get(`https://www.googleapis.com/blogger/v3/blogs/${bloggerID}/posts?key=${API_KEY}`);
        if (!doPrompt) {
            return result.data;
        }
        var list = result.data.items.map((element:any) => element.content);
        // console.log(list);
        const output = await this.currentModel.generateContent([prompt, ...list]);
        return output.response.text();
    }
}

