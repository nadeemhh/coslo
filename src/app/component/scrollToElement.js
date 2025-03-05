export default function scrollToElement(className) {
    const element = document.querySelector(`.${className}`);
    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
        console.warn(`Element with class "${className}" not found.`);
    }
}