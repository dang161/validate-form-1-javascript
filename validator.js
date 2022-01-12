// doi tuong validator

function Validator(options) {
    //ham thuc hien validate
    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector('.form-message');
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }

    }
    // lay element cua form can validate
    var formElement = document.querySelector(options.form);
        // console.log(formElement)
        if (formElement)
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                
                console.log(inputElement);
                if (inputElement) {
                    // xu ly truong hop blur khoi input
                    inputElement.onblur = function() {
                        // console.log(inputElement.value);
                        validate(inputElement, rule)
                        
                    }
                    // xu ly moi khi nguoi dung nhap vao input
                    inputElement.oninput = function(){
                        var errorElement = inputElement.parentElement.querySelector('.form-message');
                        errorElement.innerText = '';
                        inputElement.parentElement.classList.remove('invalid');
                    }
                }
            })
        }

   


// dinh nghia rules
//nguyen tac cua cac rules
// 1 . khi co loi tra ra message loi
// 2. khi hop le =) khong tra ra gi ca
Validator.isRequired = function(selector) {
    return {
        selector : selector,
        test: function(value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này'
        }
    };

}

Validator.isEmail = function (selector) {
    return {
        selector : selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Trường này phải là Email'
        }
    };

}


Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined :  message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}