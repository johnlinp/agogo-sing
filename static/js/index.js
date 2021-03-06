(function() {
    var iterateRadios = function(radios, func) {
        for (var i = 0; i < radios.length; ++i) {
            var result = func(radios[i]);
            if (result) {
                return result;
            }
        }
    };

    var getRadioValue = function(radios) {
        return iterateRadios(radios, function(radio) {
            if (radio.checked) {
                return radio.value;
            }
        });
    };

    var listenAttend = function() {
        var attendRadios = document.getElementsByName('canAttend');

        var updateRequired = function() {
            var canAttend = getRadioValue(attendRadios);

            var setAttendRequiredOpacity = function(opacity) {
                var requireds = document.getElementsByClassName('attend-required');

                for (var i = 0; i < requireds.length; ++i) {
                    var required = requireds[i];
                    required.style.opacity = opacity;
                }
            };

            if (canAttend == 'yes') {
                setAttendRequiredOpacity(100);
            } else if (canAttend == 'no') {
                setAttendRequiredOpacity(0);
            }
        };

        iterateRadios(attendRadios, function(radio) {
            radio.addEventListener('click', updateRequired);
        });

        updateRequired();
    };

    var listenMailMethod = function() {
        var methodRadios = document.getElementsByName('invitationMethod');
        var addrLabel = document.getElementById('address-label');
        var addrInput = document.getElementById('address-input');

        var updateLabel = function() {
            var mailMethod = getRadioValue(methodRadios);

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
            var attendRadios = document.getElementsByName('canAttend');

            var fields = [
                {
                    input: document.getElementById('real-name-input'),
                    enabled: true,
                },
                {
                    input: document.getElementById('address-input'),
                    enabled: true,
                },
                {
                    input: document.getElementById('phone-input'),
                    enabled: getRadioValue(attendRadios) == 'yes',
                },
            ];

            for (var i = 0; i < fields.length; ++i) {
                var field = fields[i];
                if (field.enabled && field.input.value.trim() == '') {
                    return field.input.name;
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

    var listenPageResize = function() {
        var placePig = function(pigId, platformId, xOffset) {
            var platform = document.getElementById(platformId);
            var pig = document.getElementById(pigId);

            var platformBox = platform.getBoundingClientRect();
            var pigBox = pig.getBoundingClientRect();

            pig.style.top = platformBox.top - pigBox.height + window.pageYOffset;
            pig.style.left = platformBox.right - pigBox.width - xOffset + window.pageXOffset;
        };

        var placeDialog = function(pigId, horizontal, vertical) {
            var pig = document.getElementById(pigId);
            var dialogId = pig.getAttribute('data-dialog-id');
            var dialog = document.getElementById(dialogId);

            var pigBox = pig.getBoundingClientRect();
            var dialogBox = dialog.getBoundingClientRect();

            if (horizontal == 'left') {
                dialog.style.left = pigBox.left - dialogBox.width + window.pageXOffset;
            } else if (horizontal == 'right') {
                dialog.style.left = pigBox.right + window.pageXOffset;
            }

            if (vertical == 'up') {
                dialog.style.top = pigBox.top - dialogBox.height + window.pageYOffset;
            } else if (vertical == 'down') {
                dialog.style.top = pigBox.bottom + window.pageYOffset;
            }
        };

        var updateGraphics = function() {
            placePig('pig-1', 'real-name-input', 20);
            placePig('pig-2', 'address-input', 30);
            placePig('pig-3', 'address-input', 130);
            placePig('pig-4', 'say-something-input', 50);

            placeDialog('pig-1', 'left', 'down');
            placeDialog('pig-2', 'left', 'up');
            placeDialog('pig-3', 'right', 'down');
            placeDialog('pig-4', 'left', 'up');
        };

        window.addEventListener('resize', updateGraphics);
        updateGraphics();
    };

    var listenPigsClick = function() {
        var listenPig = function(pigId) {
            var pig = document.getElementById(pigId);
            var dialogId = pig.getAttribute('data-dialog-id');
            var dialog = document.getElementById(dialogId);

            pig.addEventListener('click', function() {
                var style = window.getComputedStyle(dialog)
                if (style.visibility == 'visible') {
                    dialog.style.visibility = 'hidden';
                } else if (style.visibility == 'hidden') {
                    dialog.style.visibility = 'visible';
                }
            });
        }

        listenPig('pig-1');
        listenPig('pig-2');
        listenPig('pig-3');
        listenPig('pig-4');
    };

    listenAttend();
    listenMailMethod();
    listenSubmit();
    listenPageResize();
    listenPigsClick();
})();
