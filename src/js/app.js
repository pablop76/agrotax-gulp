import Icons from "uikit/dist/js/uikit-icons";
import UIkit from "uikit/dist/js/uikit";

// loads the Icon plugin
UIkit.use(Icons);
import "./cookieconsent";
import "./cookies";
// walidacja pod warunkiem, że formularz jest na stronie
if (document.querySelector(".form")) {
    // walidacja formularza
    class FormValidate {
        constructor(form, options) {
            const defaultOptions = {
                classError: "error",
            };
            this.form = form;
            this.options = Object.assign({}, defaultOptions, options);
            this.form.setAttribute("novalidate", "novalidate");
            this.prepareElements();
            this.bindSubmit();
        }
        getFields() {
            const inputs = [
                ...this.form.querySelectorAll(
                    "input:not(:disabled), select:not(:disabled), textarea:not(:disabled)"
                ),
            ];
            const result = [];

            for (const el of inputs) {
                if (el.willValidate) {
                    result.push(el);
                }
            }
            return result;
        }
        prepareElements() {
            const elements = this.getFields();
            for (const el of elements) {
                const tag = el.tagName.toLowerCase();
                const type = el.type.toLowerCase();
                let eventName = "input";

                if (
                    type === "checkbox" ||
                    type === "radio" ||
                    type === "tel" ||
                    tag === "select"
                ) {
                    eventName = "change";
                }

                el.addEventListener(eventName, (e) => this.testInput(e.target));
            }
        }
        testInput(input) {
            const valid = input.checkValidity();
            this.markFieldAsError(input, !valid);
            return valid;
        }

        markFieldAsError(field, show) {
            if (show) {
                field.closest(".form-wrapper-contol").classList.add("form-error");
            } else {
                field.closest(".form-wrapper-contol").classList.remove("form-error");
            }
        }
        bindSubmit() {
            this.form.addEventListener("submit", (e) => {
                e.preventDefault();
                const elements = this.getFields();
                let counter = elements.length;
                for (const el of elements) {
                    this.markFieldAsError(el, !el.checkValidity());
                    counter = !el.checkValidity() ? counter : counter - 1;
                }
                if (!counter) {
                    const form = this.form;
                    const elements = this.getFields();
                    const dataToSend = new FormData();
                    [...elements].forEach((el) => dataToSend.append(el.name, el.value));
                    const url = form.getAttribute("action");
                    const method = form.getAttribute("method");

                    const button = form.querySelector('[type="submit"]');

                    button.disabled = true;
                    button.classList.add("elem-is-busy");
                    fetch(url, {
                        method: method.toUpperCase(),
                        body: dataToSend,
                    }).then((res) => {
                        button.disabled = false;
                        button.classList.remove("elem-is-busy");
                        if (res.errors) {
                            res.errors.map(function (el) {
                                return '[name="' + el + '"]';
                            });
                            const selector = res.errors.join(",");
                            checkFieldsErrors(form.querySelectorAll(selector));
                        } else {
                            if (res.ok) {
                                const div = document.createElement("div");
                                div.classList.add("form-send-success");

                                div.innerHTML =
                                    "<strong>Wiadomość została wysłana. </strong><p>Dziękujemy za kontakt. Postaramy się odpowiedzieć jak najszybciej</p>";
                                form.parentElement.insertBefore(div, form);
                                form.remove();
                            }

                            if (!res.ok) {
                                const div = document.createElement("div");
                                div.classList.add("form-send-error");

                                div.innerHTML =
                                    "<strong>Wysłanie wiadomości się nie powiodło</strong>, </br>zgłoś nam problem pod numerem tel: +48 500 365 100,</br> lub wysyłajac wiadomość na adres: biuro@agrotax.pl z własnego klienta pocztowego.";
                                form.parentElement.insertBefore(div, form);
                                form.remove();
                            }
                        }
                    });
                }
            });
        }
    }
    document.addEventListener("DOMContentLoaded", () => {
        const cfg = {};
        const form = document.querySelector(".form");
        const fv = new FormValidate(form, cfg);
    });

}

const jsMobileAniamateDisabled = document.querySelectorAll(".js-mobile-aniamate-disabled");
const screenWidth = window.screen.width;
if (screenWidth < 640) {
    jsMobileAniamateDisabled.forEach(el => el.setAttribute('data-uk-scrollspy', ''))
}
