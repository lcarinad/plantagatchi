let $likeForm = $(".like");
let $faveBtn = $(".fave-btn");

$likeForm.on("click", ".fave-btn", async function (e) {
  e.preventDefault();
  let plant_id = $(this).attr("id");

  try {
    if ($(this).hasClass("faved")) {
      let delReq = await axios.post(
        `http://127.0.0.1:5000/delete_favorite/${plant_id}`
      );
      if (delReq.status === 200) {
        $(this).toggleClass("faved unfaved");
        console.log(`Toggled ${$(this)} to unfaved class`);
      } else {
        handleUnexpectedStatus(delReq);
      }
    } else {
      let addReq = await axios.post(
        `http://127.0.0.1:5000/add_favorite/${plant_id}`
      );
      if (addReq.status === 201) {
        $(this).toggleClass("faved");
        console.log(`Toggled ${$(this)} to faved class`);
      } else {
        handleUnexpectedStatus(addReq);
      }
    }
  } catch (error) {
    handleError(error);
  }
});
function handleUnexpectedStatus(req) {
  console.log(`Unexpected status code. Response:`, req);
}

function handleError(error) {
  console.error("An error occurred:", error);
}

$(".adv-search-btn").on("click", function (e) {
  $(".adv-search-div").toggleClass("adv-search-form-h adv-search-form-v");
});

// ****************pagination for list page********************************
let $p1 = $(".p1");
let $p2 = $(".p2");
let $p3 = $(".p3");
let $prev = $(".prev");
let $next = $(".next");

$(".page-link").on("click", function (e) {
  if ($(this).hasClass("p2")) {
    let p_num = 2;
    axios.get(`http://127.0.0.1:5000/plant_list/${p_num}`);
  }
});
