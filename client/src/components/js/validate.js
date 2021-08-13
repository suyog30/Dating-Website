$(function () {
    $.validator.addMethod('passwordReq', function (value, element) {
        return this.optional(element) || (value.match(/[a-zA-Z]/) && value.match(/[0-9]/));
    });
    $("form[name='registration']").validate({
        rules: {
            first_name: "required",
            last_name: "required",
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 5,
                passwordReq: true
            }
        },
        messages: {
            firstname: "Please enter your firstname",
            lastname: "Please enter your lastname",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long",
                passwordReq: "Password must contain at least one numeric and one alphabetic character."
            },
            email: "Please enter a valid email address"
        },
        submitHandler: function (form,event) {
            event.preventDefault();
            $.ajax({
                url: "/user/signup",
                data: $(form).serialize(),
                type: 'POST',
                success: function(response) {
                    window.location.href = '/dashboard/';
                },
                error: function(resp) {
                    $(form).find('.error').text(resp.responseJSON.error).removeClass("error-hidden");
                }
            });
            return false;
        }
    });
    $("form[name='login_form']").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        messages: {
            password: {
                required: "Please enter your password"
            },
            email: "Please enter a valid email address"
        },
        submitHandler: function (form,event) {
            event.preventDefault();
            $.ajax({
                url: "/user/login",
                data: $(form).serialize(),
                type: 'POST',
                success: function(response) {
                    window.location.href = '/dashboard/';
                },
                error: function(resp) {
                    $(form).find('.error').text(resp.responseJSON.error).removeClass("error-hidden");
                }
            });
            return false;
        }
    });
});