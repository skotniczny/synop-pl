import { elt } from "../dom"
import "./toast.css"

type ToastType = "warning" | "danger" | "info"

function createToast(type: ToastType, message: string): HTMLDivElement {
  const base = "toast"
  const toast = elt("div", { className: `${base} ${base}-${type}` }, message)
  const closeBtn = elt("button", { className: `${base}_close`, type: "button" }, "×")
  closeBtn.addEventListener("click", () => toast.remove())
  toast.append(closeBtn)
  return toast
}

function createToastsContainer(): HTMLDivElement {
  const container = elt("div", { className: "toasts" })
  document.body.append(container)
  return container
}

function showToast(type: ToastType, message: string): void {
  const el = createToast(type, message)
  const container = document.querySelector<HTMLDivElement>(".toasts") ?? createToastsContainer()
  container.append(el)
}

export function toastDanger(message: string): void {
  showToast("danger", message)
}

export function toastWarning(message: string): void {
  showToast("warning", message)
}

export function toastInfo(message: string): void {
  showToast("info", message)
}
