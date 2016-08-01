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

    listenMailMethod();
})();
