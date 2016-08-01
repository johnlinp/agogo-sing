(function() {
    var listenMailMethod = function() {
        var methodRadios = document.getElementsByName('invitationMethod');
        var addrLabel = document.getElementById('address-label');
        var addrInput = document.getElementById('address-input');

        var iterateRadios = function(radios, func) {
            for (var i = 0; i < radios.length; ++i) {
                var result = func(radios[i]);
                if (result) {
                    return result;
                }
            }
        };

        var updateLabel = function() {
            var mailMethod = iterateRadios(methodRadios, function(radio) {
                if (radio.checked) {
                    return radio.value;
                }
            });

            if (mailMethod == 'email') {
                addrLabel.innerHTML = addrLabel.getAttribute('data-email');
                addrInput.setAttribute('type', 'email');
            } else if (mailMethod == 'postal') {
                addrLabel.innerHTML = addrLabel.getAttribute('data-postal');
                addrInput.setAttribute('type', 'text');
            }
        };

        iterateRadios(methodRadios, function(radio) {
            radio.addEventListener('click', updateLabel);
        });

        updateLabel();
    };

    var listenSubmit = function() {
        var getBlankField = function() {
            var fields = [
                document.getElementById('real-name-input'),
                document.getElementById('address-input'),
                document.getElementById('phone-input'),
            ];

            for (var i = 0; i < fields.length; ++i) {
                var field = fields[i];
                if (field.value.trim() == '') {
                    return field.name;
                }
            }
        };

        var questions = document.getElementById('questions');
        var warn = document.getElementById('warn');

        questions.addEventListener('submit', function(evt) {
            var blankField = getBlankField();

            if (blankField) {
                warn.innerHTML = warn.getAttribute('data-blank-warn-msg');
                evt.preventDefault();
            }
        });
    };

    listenMailMethod();
    listenSubmit();
})();
