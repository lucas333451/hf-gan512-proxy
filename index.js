export default {
  async fetch(request, env, ctx) {
    // 1. 这里我已经帮你填好了你的专属运行地址
    const TARGET_HOST = "lucasyip-gan512.hf.space";

    const url = new URL(request.url);
    url.hostname = TARGET_HOST;
    url.protocol = "https:";
    url.port = "443";

    // 2. 创建新请求，保留原始请求的方法（GET/POST）和内容
    const newRequest = new Request(url.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: "follow",
    });

    // 3. 关键步骤：伪装请求头
    // 告诉 Hugging Face 我们是直接访问它的，而不是通过代理
    newRequest.headers.set("Host", TARGET_HOST);
    newRequest.headers.set("Origin", `https://${TARGET_HOST}`);
    newRequest.headers.set("Referer", `https://${TARGET_HOST}/`);

    // 4. 发送请求并返回结果
    const response = await fetch(newRequest);
    return response;
  },
};
