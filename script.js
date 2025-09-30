$(document).ready(function () {
    // Load Teachers
    $.getJSON("data/teachers.json", function (data) {
        $('#teacher').append('<option value="">Select Teacher</option>');
        $.each(data.teachers, function (i, name) {
            $('#teacher').append(`<option value="${name}">${name}</option>`);
        });
    });

    // Load Standards
    $.getJSON("data/standards.json", function (data) {
        $('#standard').append('<option value="">Select Standard</option>');
        $.each(data.standards, function (i, std) {
            $('#standard').append(`<option value="${std}">${std}</option>`);
        });
    });

    // Load Subjects based on Teacher
    $('#teacher').change(function () {
        let teacher = $(this).val();
        $('#subject').empty().append('<option value="">Select Subject</option>');
        $.getJSON("data/subjects.json", function (data) {
            if (data[teacher]) {
                $.each(data[teacher], function (i, sub) {
                    $('#subject').append(`<option value="${sub}">${sub}</option>`);
                });
            }
        });
    });

    // Load Chapters based on Subject and Standard
    $('#subject, #standard').change(function () {
        let std = $('#standard').val();
        let sub = $('#subject').val();
        $('#chapter').empty().append('<option value="">Select Chapter</option>');
        if (std && sub) {
            $.getJSON("data/chapters.json", function (data) {
                if (data[std] && data[std][sub]) {
                    $.each(data[std][sub], function (i, chap) {
                        $('#chapter').append(`<option value="${chap}">${chap}</option>`);
                    });
                }
            });
        }
    });

    // Load Learning Outcomes based on Chapter, Subject and Standard
    $('#chapter').change(function () {
        let std = $('#standard').val();
        let sub = $('#subject').val();
        let chap = $('#chapter').val();
        $('#learningOutcome').empty().append('<option value="">Select Outcome</option>');
        if (std && sub && chap) {
            $.getJSON("data/learning_outcomes.json", function (data) {
                if (data[std] && data[std][sub] && data[std][sub][chap]) {
                    $.each(data[std][sub][chap], function (i, lo) {
                        $('#learningOutcome').append(`<option value="${lo}">${lo}</option>`);
                    });
                }
            });
        }
    });
});
