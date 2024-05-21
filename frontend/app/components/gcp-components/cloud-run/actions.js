"use server"
const {GoogleAuth} = require('google-auth-library');
const auth = new GoogleAuth();

const url="https://genai-lunugb47oq-ew.a.run.app/"
const targetAudience = 'https://genai-lunugb47oq-ew.a.run.app/'

export async function generate(methodgenAI,productDetails) {
    const obj = productDetails
    obj.url=productDetails["images"][0].uri
    const client = await auth.getIdTokenClient(targetAudience);
    const descGenAi = await client.request({
        url:url+methodgenAI,
        method:"POST",
        body:JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const response = await descGenAi.data;
    return {message: response}
};

