import { UserInfo, ConversationRequest } from "./models";

export async function conversationApi(options: ConversationRequest, abortSignal: AbortSignal): Promise<Response> {
    const response = await fetch("/conversation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages: options.messages
        }),
        signal: abortSignal
    });

    return response;
}

export async function getUserInfo(): Promise<UserInfo[]> {
    const response = await fetch('/.auth/me');
    if (!response.ok) {
        console.log("No identity provider found. Access to chat will be blocked.")
        return [];
    }

    const payload = await response.json();
    return payload;
}
export async function uploadFileApi(request: FormData): Promise<IUploadResponse> {

    // Send a POST request to the "/upload" endpoint with the provided form data

    const response = await fetch("/upload", {

        method: "POST",

        body: request

    });




    // Check if the response status is not "OK".

    if (!response.ok) {

        throw new Error(`Uploading files failed: ${response.statusText}`);

    }




    // Parse the JSON response into the IUploadResponse type.

    const dataResponse: IUploadResponse = await response.json();




    // Return the parsed data as the result of the Promise.

    return dataResponse;

}

