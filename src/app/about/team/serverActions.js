"use server"; // Marks this file as server-only

export async function incrementCounter(formData,currentCount) {
  console.log(formData)
  return currentCount + 1;
}
