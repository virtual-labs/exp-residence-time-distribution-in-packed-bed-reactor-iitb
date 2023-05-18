var obtable_verified = false;
var obt1_first_value_verfied = false;
var flow_rate_text = document.createElement('div');
// var button = `<button class="offcanvasbtn"  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1"><i class="bi bi-gear offcanvasicon"></i></button>`;
var ob_btn = `<button id="panel1_btn" class="btn btn-primary" onclick="complete_obtab_1();" style="
position: absolute; bottom: 12vh; width: 90%;"> Display Observation Table</button>`;
var ob_btn_fr2 = `<button id="panel1_btn" class="btn btn-primary" onclick="complete_obtab_2();" style="
position: absolute; bottom: 12vh; width: 90%;"> Display Observation Table</button>`;
var move_to_act4 = `<button id="panel1_btn" class="btn btn-primary" onclick="activity4();" style="
position: absolute; bottom: 12vh; width: 90%;">Start Calculations</button>`;
// pp.addtoleftpannel(table);
// pp.addtoleftpannel("<br>");
// pp.addtoleftpannel(table);
// pp.addcanvas('activiy-1');
// var canvas = pp.canvas;
function activity3() {
    pp.clearleftpannel();
    //   pp.addtoleftpannel(button);
    pp.showdescription('<p style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: 2.5vw;">Fill in the all noted values in table and click verify. <br> 2 points for each correct value</p>', 3);
    pp.showtitle("Complete the Observation Table", 3);
    pp.showscore("100", 3);
    var obtable = `

<br>

<table class="table" style="height: 70vw; font-size: calc(0.7vw + 9px);">
    <thead>
      <tr id="obtab-head">
        <th scope="col">Obs No.</th>
        <th scope="col">Time (Sec)</th>
        <th scope="col">Conductivity (Siemens)</th>
        <th id='act3-tab1-checked' scope="col">Check</th>
      </tr>
    </thead>
    <tbody id="table-1-body">
      <tr>
        <th scope="row">1</th>
        <th>${obt_1_data[0][0]}</th>
        <td><input type="text" id="obt1-r1"></td>
        <td><input class="btn btn-primary" onclick="act3_verify_obtable_1();" value="verify" style="width: 100%" type="button"></td>
      </tr>


      <tr>
      <th scope="row">2</th>
      <th>${obt_1_data[1][0]}</th>
      <td><input type="text" id="obt1-r2"></td>
      <td><input class="btn btn-primary" onclick="act3_verify_obtable_2();" value="verify" style="width: 100%" type="button"></td>
    </tr>
     
    </tbody>
  </table>

`;
    flow_rate_text.innerHTML = `
    <p id="fr-text">
    Flow Rate = 200 cm<sup>3</sup>/min
    </p>
`;
    add_std_dev_to_tab12();
    pp.addtoleftpannel(flow_rate_text.innerHTML);
    pp.addtoleftpannel(obtable);
}
function add_std_dev_to_tab12() {
    for (let i = 0; i < obt_1_data.length; i++) {
        obt_1_data[i][1] = parseFloat(std_deviation(obt_1_data[i][1]).toFixed(2));
        obt_2_data[i][1] = parseFloat(std_deviation(obt_2_data[i][1]).toFixed(2));
    }
    console.log(obt_1_data);
}
function act3_verify_obtable_1() {
    let val1 = document.getElementById("obt1-r1");
    // console.log(Q.value, To.value, Ti.value, ti.value, to.value);
    if (!verify_values(parseFloat(val1.value), obt_1_data[0][1])) {
        console.log(parseInt(val1.value), obt_1_data[0][1]);
        alert("Please correct the first row Conductivity value");
        return;
    }
    obt1_first_value_verfied = true;
}
function act3_verify_obtable_2() {
    let val1 = document.getElementById("obt1-r2");
    // console.log(Q.value, To.value, Ti.value, ti.value, to.value);
    if (!verify_values(parseFloat(val1.value), obt_1_data[1][1])) {
        console.log(parseInt(val1.value), obt_1_data[1][1]);
        alert("Please correct the Second row Conductivity value");
        return;
    }
    obtable_verified = true;
    pp.showdescription('<p style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: calc(0.8vw + 8px);">Show the full Table with flow rate = 200 cm<sup>3</sup>/min</p>', 3);
    if (obt1_first_value_verfied) {
        pp.addtorightpannel(ob_btn, 3);
        var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasRight3"));
        bsOffcanvas.show();
    }
    else {
        return;
    }
}
function complete_obtab_1() {
    document.getElementById('hide_panel3').click();
    let table_body = document.getElementById('table-1-body');
    let head = document.getElementById('obtab-head');
    head.innerHTML += `
  <th scope="col">Obs No.</th>
  <th scope="col">Time (Sec)</th>
  <th scope="col">Conductivity (Siemens)</th>
  `;
    table_body.innerHTML = ``;
    // close_offcanvas();
    document.getElementById('panel1_btn').remove();
    // pp.addtorightpannel(act4_btn_2, 3);
    document.getElementById('act3-tab1-checked').remove();
    for (let i = 0; i < obt_1_data.length / 2; i++) {
        let row = document.createElement('tr');
        row.innerHTML = `
      <td>${i + 1}</td>
      <td>${obt_1_data[i][0]}</td>
      <td>${obt_1_data[i][1]}</td>
      <td>${10 + i + 1}</td>
      <td>${obt_1_data[10 + i][0]}</td>
      <td>${obt_1_data[10 + i][1]}</td>
      `;
        table_body.append(row);
    }
    pp.addtorightpannel(ob_btn_fr2, 3);
}
function complete_obtab_2() {
    document.getElementById('hide_panel3').click();
    let table_body = document.getElementById('table-1-body');
    let text = document.getElementById('fr-text');
    text.innerHTML = `
  The same Experiment has been repreated with Flow Rate = 400 cm<sup>3</sup>/min
  `;
    table_body.innerHTML = ``;
    // close_offcanvas();
    document.getElementById('panel1_btn').remove();
    // pp.addtorightpannel(act4_btn_2, 3);
    for (let i = 0; i < obt_2_data.length / 2; i++) {
        let row = document.createElement('tr');
        row.innerHTML = `
      <td>${i + 1}</td>
      <td>${obt_2_data[i][0]}</td>
      <td>${obt_2_data[i][1]}</td>
      <td>${10 + i + 1}</td>
      <td>${obt_2_data[10 + i][0]}</td>
      <td>${obt_2_data[10 + i][1]}</td>
      `;
        table_body.append(row);
    }
    pp.showdescription('<p style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: calc(0.8vw + 8px);">Let\'s start with calculations.</p>', 3);
    pp.addtorightpannel(move_to_act4, 3);
}
//# sourceMappingURL=activity3.js.map