(($) => {
    window.activeGMaps = [];

    $(document).ready(function() {
        const $xhr = $.ajax({
            url: 'ajax/location.json',
            beforeSend:(jQxhr)=> {
                $('.preloader').addClass("active");
            },
            complete: (jQxhr) => {
                // $('.preloader').removeClass("active");
            }
        });

        $xhr.done((response) => {
            if (response.success) {
                response.data.forEach((elem, i, arr) =>{
                    const $location =$(
                        '<div class="location">' +
                        '<div class="location__description">Address string one</div>' +
                        '<div class="location__map"></div>' +
                        '</div>'
                    );
                    $('.content').append($location);

                    const latLng = {lat: elem.lat, lng: elem.lng};
                    const gMap = new google.maps.Map($location.find('.location__map')[0], {
                        center: latLng,
                        zoom: 8
                    });

                    const marker = new google.maps.Marker({
                        position: latLng,
                        map: gMap
                    });

                    window.activeGMaps.push(gMap);
                });

            }else {
                console.log ('Error! AJAX response');
            }
            $('.preloader').removeClass("active");
        });

    });
})(jQuery);