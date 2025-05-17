function navigateTo(path) {
  window.location.href = path;
}

document.addEventListener("DOMContentLoaded", function () {
  const mapContainer = document.getElementById("map");
  const mapOption = {
    center: new kakao.maps.LatLng(37.545057, 126.964493),
    level: 5,
  };

  const map = new kakao.maps.Map(mapContainer, mapOption);
  const ps = new kakao.maps.services.Places();

  //마트 불러오기
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const locPosition = new kakao.maps.LatLng(lat, lon);

        map.setCenter(locPosition);

        // 검색 실행
        searchMarts(locPosition);
      },
      function (error) {
        // 위치 접근 거부 시 → 숙명여대
        useDefaultLocation();
      }
    );
  } else {
    useDefaultLocation();
  }

  function useDefaultLocation() {
    const defaultPosition = new kakao.maps.LatLng(37.545057, 126.964493); // 숙대
    map.setCenter(defaultPosition);
    searchMarts(defaultPosition);
  }

  function searchMarts(center) {
    ps.categorySearch("MT1", placesSearchCB, {
      location: center,
      radius: 1000,
    });
  }

  function placesSearchCB(data, status) {
    if (status !== kakao.maps.services.Status.OK) return;

    const listEl = document.getElementById("store-list");
    listEl.innerHTML = ""; // 기존 목록 비우기

    data.forEach((place) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      //InfoWindow 생성
      const infowindow = new kakao.maps.InfoWindow({
        content: `
    <div style="
      padding:6px 10px;
      font-size:14px;
      min-width:140px;
      max-width:220px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    ">
      ${place.place_name}
    </div>
  `,
      });

      //마커 클릭 시 정보창 열기
      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
      });

      //목록 출력
      const item = document.createElement("div");
      item.className = "store-item";
      item.innerHTML = `<strong>${place.place_name}</strong><div>${place.address_name}</div>`;
      listEl.appendChild(item);
    });
  }
});
