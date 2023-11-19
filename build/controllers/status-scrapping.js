import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export async function getStatus(link) {
    try {
        setTimeout(20000)
        const response = await fetch(link, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            },
            timeout: 5000  // Aumenta este valor
        });
        
        
        const html = await response.text();
        const dom = new JSDOM(html);
        // const element = dom.window.document.querySelectorAll('span.styles__TextElement-sc-3qedjx-0[color="#00872F"]');
        const element = dom.window.document.querySelectorAll("span")
        const array = [...element].map((e) => e.innerText)
        console.log(array)
        return array[0] === "Open"
    } catch (error) {
        console.error(error);
        return false;
    }
}
