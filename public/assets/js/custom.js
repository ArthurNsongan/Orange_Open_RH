$.fn.initVideoLoader = function () {

    return this.each(function () {
        //console.log("ELEMENT", $(this));
        $(this).addClass('video-loader');
        $(this).on('loadstart', function (event) {
            $(this).addClass('video-loader');
        });
        $(this).on('canplay', function (event) {
            $(this).removeClass('video-loader');
            $(this).parent().addClass('video-not-loader');
            $(this).attr('poster', '');
        });

    });

};

$.fn.initImageNotLoadPlaceHolder = function () {
    return this.each(function () {
        $(this).on('error', function (e) {
            $(this).attr('src', '/assets/img/image-not-found.png');
        });
    })
};

$.fn.initDropdownToggleHover = function () {
    return this.each(function () {
        console.log($(this));
        $(this).hover(function () {
            $(this).attr("aria-expanded", true);
            $(this).parent().addClass("show");
            $(this).children(".dropdown-menu").addClass("show");
        });
        $(this).mouseleave(function () {
            $(this).attr("aria-expanded", false);
            $(this).parent().removeClass("show");
            $(this).children(".dropdown-menu").removeClass("show");
        });
    })
};


function confetti() {
    new confettiKit({
        confettiCount: 40,
        angle: 90,
        startVelocity: 50,
        colors: randomColor({hue: 'blue', count: 18}),
        elements: {
            'confetti': {
                direction: 'down',
                rotation: true,
            },
            'star': {
                count: 10,
                direction: 'down',
                rotation: true,
            },
            'ribbon': {
                count: 5,
                direction: 'down',
                rotation: true,
            },
            'custom': [{
                count: 1,
                width: 50,
                textSize: 15,
                content: 'http://www.clker.com/cliparts/0/6/9/c/1194986736244974413balloon-red-aj.svg.thumb.png',
                contentType: 'image',
                direction: 'up',
                rotation: false,
            }]
        },
        position: 'bottomLeftRight',
    });
}

function confettiTop() {
    new confettiKit({
        colors: randomColor({hue: 'pink', count: 18}),
        confettiCount: 40,
        angle: 90,
        startVelocity: 50,
        elements: {
            'confetti': {
                direction: 'down',
                rotation: true,
            },
            'star': {
                count: 10,
                direction: 'down',
                rotation: true,
            },
            'ribbon': {
                count: 5,
                direction: 'down',
                rotation: true,
            },
        },
        position: 'topLeftRight',
    });
}

$(document).ready(function () {
/*     if (!localStorage.getItem("BIRTHDAY")) {
        setTimeout(function () {
            console.warn("click");
            $("#modal-container").removeAttr("class").addClass("one");
            $("body").addClass("modal-active");

            setTimeout(function () {
                confetti();
                confettiTop()
            }, 2000);
            setTimeout(function () {
                confetti();
                confettiTop();
            }, 3000);
            setTimeout(function () {
                confetti();
                confettiTop();
            }, 4000);

            localStorage.setItem("BIRTHDAY", true);
        }, 7000);
    } */

});
