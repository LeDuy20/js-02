function Validator(options) {
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(
            options.errorSelector
        );
        var errorMessage = rule.test(inputElement.value);

        if (errorElement) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add("invalid");
        } else {
            
            inputElement.parentElement.classList.remove("invalid");
        }
    }
    var formElement = document.querySelector(options.form);
    if (formElement) {
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                //khi người dùng thoát ra khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                };
                //Khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(
                        options.errorSelector
                    );
                    errorElement.innerText = "";
                    inputElement.parentElement.classList.remove("invalid");
                };
            }
        });
    }
}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || "Vui lòng nhập đầy đủ họ tên";
        },
    };
};

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || "Vui lòng nhập đúng email";
        },
    };
};
Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min
                ? undefined
                : message || `Vui lòng nhập đủ ${min} kí tự`;
        },
    };
};
Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmed.value
                ? undefined
                : message || "Mật khẩu không đúng";
        },
    };
};
