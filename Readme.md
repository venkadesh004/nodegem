<h1>Node module for google ecosystem with Gemini AI</h1>
<p>We build a ecosystem for google drive service to access that drive using gemini with these we create,update,download,read that drive which can access images and vedios,which can only be send as prompt.There are also some built in parameter,Every prompt we send to the model includes parameter values that control how the model generates a response.The model can generate different results for different parameter values.The most comman model paremeters are:</p>
<ol>Max output token</ol>
<ol>Temperature</ol>
<ol>topK</ol>
<ol>topP</ol>
<ol>stop_sequences</ol>

<b>Max output tokens:</b>

<p>Specifics the maximum number of tokkens that can be generated in the response.A token is approximately four characters.100 tokens corresponds to roughly 80 words.</p>

<b>Temperature:</b>

<p>The temperature controls sthe degree of randomness in tokens selection.The temperature is used for sampling during responce generation,which occurs when topP and topK are applied.Lower temperatures are good for prompts that require a more deterministic or less open-ended response,while higher temperatures can lead to more diverse or creative results.A temperature of 0 is deterministic,meaning that the highest probabity response is always selected.</p>

<b>topK:</b>

<p>The topK parameter changes how teh model selects tokens for output.A topK of 1 means the selected token is the most probable among all the next thr tokens in the model's vocabulary also called greedy decoding,while a topK of 3 means that the next token is selected from among the 3 most protable using the temperature.For each token selection step,the topK tokens with the highest probabilities are sampled.Tokens are then futher filtered based on topP with the final token selected using temperature sampling.</p>

<b>topP:</b>

<p> The topP parameter changes how the model selects tokens for output.Tokena are selected from the most to least probable untill the sum of their probabilities equals the topP value.For example,if tokens A,B and C have a probability of 0.3,0.2 and 0.1 and the topP values is 0.5,then the model will select either A or B as the next token by using the temperature and exclude C as a candidate.The default topP value is 0.95.</p>

<b>stop_sequence:</b>

<p>Seta stop sequence to tell the model to stop generating content.A stop sequence can be any sequence of characters.Try to avoid using a sequence of chaarcters that may appear in the generated content.
</p>

<h3>Categories to that makes gemini ,good</h3>
<b>Harassment:</b>
<p>Negative or harmful comments targeting identity and/or protected attributes.</p>
<b>Hate speech:</b>
<p>Content that is rude,disrespectful, or profane.</p>
<b>Sexually explicit:</b>
<p>Contains references to sexual acts or other lewd content.</p>
<b>Dangerous:</b>
<p>Promotes,facilitates or encourage harmful acts.</p>

<h3>Threshold for google AI studio:</h3>
<b>BLOCK_NONE</b>
<p>Always show regardless of probability of unsafe content</p>
<b>BLOCK_ONLY_HIGH</b>
<p>Block when medium or high probability of unsafe content.</p>
<b>BLOCK_MEDIUM_AND_ABOVE</b>
<p>Block when low,medium or high probability of unsafe content.</p>
<b>HARM_BLOCK_THRESHOLD_UNSPECIFIED</b>
<p>Threshold is unspecified,block using default threshold</p>
<h3>Probabilities</h3>
<ol><b>Negligible</b></ol>
<p>Content has a negligible probability of being unsafe</p>
<ol><b>low</b></ol>
<p>Content has a low probability of being unsafe</p>
<ol><b>Medium</b></ol>
<p>Content has a medium probability of being unsafe</p>
<ol><b>High</b></ol>
<p>Content has a high probability of being unsafe</p>

<h3>For experiencing this we create a react web appliation for a e-commerce</h3>

<p>We create a basic web appliaction for e-commerce conatains a login and file upload page with fully validated.From this website we are trying to get the use our developing module for example nowadays cloth making shops for upto the trend becomes most popular.So we taken that as our example business model because that particular brand can't do best or exceptionally well in both clothing and branding theirs to incraese the sales.For being better in branding and searching off we provides keywords that will be useful for both enduser and that particular brand company from that image prompt from that we access from google drive not a direct prompt we access it and give discription and related features about it.So that brand cant be worried about the marketting and branding meanwhile it also helps for the customers to get the expected things in right time. For provide these kinds of services we  initialise API keys and access the google drive using that and gemini ai in that ,fetch the both to get results that we expected.Here we transfer all the images and info by streams and get as or stored in buffer for arranging the different colections of data in a better way.For google authentication we use two methods oath 2.0 and service accounts,for that service account we create a private key to access JWT (jeson web tokens) that is used for client verification.These are for service accounts.For outh  2.0 we have to create a new project and we have to redirect the URL's and now we have to download the credentials.Using connectAuthClient ,that provides two forms of security for session management, including the Internet Identity delegation. for that connectAuthClient function we have three parameters which are Tokens_path,Credentials_path,scopes. Here Token_path refers to path loaction of token.js and Credentials_path are refers to path there credentials are been there.Lastly we have scope that refers to the OAuth 2.0 scopes that you might need to request to access Google APIs, depending on the level of access you need. Sensitive scopes require review by Google and have a sensitive indicator on the Google Cloud Console's OAuth consent screen configuration page. Many scopes overlap, so it's best to use a scope that isn't sensitive.If your public application uses scopes that permit access to certain user data, it must complete a verification process. If you see unverified app on the screen when testing your application, you must submit a verification request to remove it.</p>

<table> 
<tr>
<th>Method</th>
<th>Parameter</th>
<th>Return Type</th>
<th>Description</th>
</tr>
<tr>
<td>constructor</td>
<td>API_KEY: string, modelName: string</td>
<td>void</td>
<td>The constructor function which Initializes the Model</td>
</tr>
<tr>
<td>generateContent</td>
<td>prompt: string, stream: boolean</td>
<td>Promise<string></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>

<tr>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
</table>
generateContent

For this parameter are prompt and streams.Datatype of prompt is String and for stream its Boolean.Here we checking conditions for model name if its not a gemini-pro means we have to return promise that in string. If its stream means we call that generateContentStream and pass prompt as parameter into that function.That we save in const and return as response text.
fileToGenerativePart:

For this paramater are path and mimeType.Datatype of path is String and for mimeType its string.Here we have inlineData inside that readFileSync function is called and path parameter is passed into it and convert that into string using base64.

useTextAndImage:

For this parameter are imageParts,streams and prompts.Datatype of imageParts is String,for streams it is boolean and for prompt it's String.Return type we keep promise as string.We use conditions if modelName is gemini-pro we have to return that statement.In results we call the generateContent function and call that inside that function we pass the parameters as prompt and newImageParts,awaits for results response and returns as text output.

changeConfig:

For this parameter are maxOutputTokens,temperature,topP,topK,stopSequence.Datatype of maxOutputTokens,temperature,topP,topK is number and for stopSequence its String.
We create a object for that and use currentModel and here we call GoogleGenerativeAI and here we pass the parameter API_KEY and in getGenerativeModel function we pass the modelName,safetySettings etc.

loadSavedCredentialsIfExist:

For this parameters are token_path,datatype is String.Here we use try catch model and we return the promise readFile in that we pass the token_path.For credentials we use json parse and we pass content in that, its datatype is String.For return values we use google.auth.fromJSON and pass the parameter credentials,and we handle the error.

connectServiceAccount:

For this parameters are clientKey,keyFile,privateKey, scopes,Promise.For these we have string as datatype except promise.promise is void.and after this we use jwtClient and use authirize funtion for authoraisation issues.

saveCredentials:

For this we pass paramaters client,credentials_path,token_path and we have return type promise as void.Datatypes for client might maybe anything,credentials_path must be string and token path as string. For content we awaits promise and readFile in that we pass credentials_path as parameter.For keys we get JSON.parse(content) and for key we have install those keys and payload is JSON that is stringify inside that we have types,client_id,client_secret,refresh_token.For return type we use promises and we write the file here using token_path, payload parameters etc.

connectAuthClient:

For this we pass token_path,credentials_path,scopes and a return type promise.The token_path and credentials_path are considered as string,scopes is string array and promise is void as usual.We create authConnect using loadSavedCredentialsIfExist function and pass token_path as parameter in to this.
In this we use conditions to check the gmail credentials with the version and parameter that was passed into the function gmail function and in saveCredentials we pass the object of authConnect,credentials_path,token_path.

listFiles:

For this we pass pageSize as parameter its a number and return type as promise it must be a string matrix,null or undefined.Here, we access google drive for getting versions and auth with jwtClient.And here we have results with files.list functions that contains pageSize and fields.conditions have been checken here that file length must not be zero if it satisfied means push the list with file name and file id.

uploadFile:

For this we having fileName as parameters and promise as string.we init drive using drive() function having parameters of version,auth with jwtclient.And after that we check the conditions and calls createReadStream function and pass fileName as parameter this is for media.As same as for field witha basename with fileName parameter as passed.

updateFile:

For this we having fileName,fileId as parameter and return type as promise.Both fileName and fileId has string as parameter.and we have to check the condition heer that it have both fileName and fileId with media and fileId using createReadStream as fileName is passed as parameter.

downloadFile:

For this we have fileName,fileId,listenerFunction as parameter and promise as return function.For that we have to connect with driove using version and auth with that jwtClient.And checks the conditions if both fileName and fileId is done we have to fix the fileID and responseType with streams and there itself it handles the error.Using listenerFunction and .pipe(dest) we implemet this download file.

driveAndPrompt:

For this we have prompt,fileName,fileId as parameters and Promise for returning the files.Use google-pro and get and use gemini pro version.And then connect with drive using drive() fn. After that we are expected to use conditions checks with fileName and fileId that we have to convert the chunks into UintBinary by getting fileId,responseType with streams and it can aslo able to access the error.

returnImageBuffer:

For this we have fileName,fileId as parameters and Promise for returning the files.Check the conditions after that chunks to Uint8Array with fileId,responseType and also handle some errors.Response the data with chunks and resolve that error.

returnSnippet:

For this we have userId,maxResult,Promise as return function.We have to check the connection with gamil and undefinend and we use messages.list and that contains userId,maxResult and datamanagers.When mails note equal to the undefined only it shows lineSnippets and return that as output for this function.

promptSnippet:

For this i'm edit() and if this.modelName === gemini-pro-vision and return as promise for getting output.Handling the error corrections.

sendMail:

For this we have from,to,subject,text,html,name,prompt.All the parameters are string only.Condition have to check with oAuth2Client with creating a object with clientId,clientSecret,clientSecret and also with checkCredentials we build refresh_token with oAuthClient.It users nodemailer and servies align with them.
validate the mail using mailOptions and at last we translate the issues that are been faced.

translateText:

For this we have a text with any datatype and a targetLang using translation function it passes text and techlang.Here we using translation functions using this.

getBlogData:

For this we have a API_KEY,bloggerID as parameters and with Promise as a return type.Using axios here for google bloggers and returns the results response text.

getBlogContent:

For this we have API_KEY, bloggerID, doPrompt, prompt,Promise with as a return parameter.Here we have to check the conditions and list the elements while are been mapped.currentModel is to generate Content form to list,and put the result response through text.Here we use axios to get api and we have to pass AxiosResponse to the promise.

switchModel:

For this we have modelName as parameter which is in string datatype and the return type is with void. and pass the api key to the generative ai and with that getGenerativeModel with a modelName as parameter.