export default function extractDate(isoString) {

    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;


    // if (!isoString) return null;
    
    // try {
    //     return isoString.split("T")[0]; // Extracts the date portion before 'T'
    // } catch (error) {
    //     console.error("Invalid ISO string format", error);
    //     return null;
    // }
}