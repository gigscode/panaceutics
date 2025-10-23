export const loadPaystack = () => {
  return new Promise<any>((resolve, reject) => {
    if (typeof window !== "undefined" && (window as any).PaystackPop) {
      resolve((window as any).PaystackPop)
      return
    }
    const script = document.createElement("script")
    script.src = "https://js.paystack.co/v1/inline.js"
    script.async = true
    script.onload = () => {
      if ((window as any).PaystackPop) {
        resolve((window as any).PaystackPop)
      } else {
        reject(new Error("Paystack failed to load"))
      }
    }
    script.onerror = () => {
      reject(new Error("Failed to load Paystack script"))
    }
    document.body.appendChild(script)
  })
}
