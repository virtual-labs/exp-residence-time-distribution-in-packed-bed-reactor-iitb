var sum_c1_delta_t_1 = 0;
var sum_c1_delta_t_2 = 0;
var sum_ci_ti_delta_t_1 = 0;
var sum_ci_ti_delta_t_2 = 0;
var tau_1;
var tau_2;
var vol_of_reactor = 1470;
var void_vol_of_reactor = 1102;
var void_fraction = 0.75;
var sum_ci_ti_ti_delta_t_1 = 0;
var sum_ci_ti_ti_delta_t_2 = 0;
var main_table = ``;
var t_bar_1;
var t_bar_2;
var sigma_1;
var sigma_2;
var root_1;
var root_2;
var first_row_verified = false;
var act4_btn_1 = `<button id="panel1_btn" class="btn btn-primary" onclick="complete_main_table_1();" style="
position: absolute; bottom: 12vh; width: 90%;"> Display Observation Table</button>`;
var verify_summations_btn = `<button id="panel1_btn" class="btn btn-primary" onclick="verify_summations();" style="position: absolute; bottom: 12vh; width: 90%;"> Display Observation Table</button>`;
var move_to_act5 = `<button id="panel1_btn" class="btn btn-primary" onclick="complete_main_table_2();" style="position: absolute; bottom: 12vh; width: 90%;"> Display Observation Table</button>`;
function activity4() {
    tau_1 = (void_vol_of_reactor * 60) / flow_rate_1;
    obt_1_data = add_readings(obt_1_data, tau_1);
    // console.log(obt_1_data);
    tau_2 = (void_vol_of_reactor * 60) / flow_rate_2;
    obt_2_data = add_readings(obt_2_data, tau_2);
    console.log(obt_2_data);
    console.log(tau_2);
    calculate_sum_val_tab1();
    calculate_sum_val_tab2();
    main_table = `
    <div id="act5-main-table" class="table-responsive">
<table  class="table" style="height: 95% !important;">
    <thead>
      <tr>
        <th scope="col">Sr No.</th>
        <th scope="col">Time t<sub>i</sub> (sec)</th>
        <th scope="col">Conductivity (siemens)</th>
        <th scope="col">Concentration C<sub>i</sub></th>
        <th scope="col">&Delta;t<sub>i</sub></th>
        <th scope="col">C<sub>i</sub> &Delta;t<sub>i</sub></th>
        <th scope="col">C<sub>i</sub> t<sub>i</sub> &Delta;t<sub>i</sub></th>
        <th scope="col">E(t)</th>
        <th scope="col">E<sub>LFR</sub></th>
        <th scope="col">C<sub>i</sub> t<sub>i</sub><sup>2</sup> &Delta;t<sub>i</sub></th>
        <th id="a5-temp" scope="col">Check</th>
        
      </tr>
    </thead>
    <tbody id="table-5-body">
      <tr>
          <td>1</td>
          <td>${obt_1_data[0][0]}</td>
          <td>${obt_1_data[0][1].toFixed(2)}</td>
          <td><input style="width: 100%;" id="mt-1" type="text" class="form-control"></td>
          <td><input style="width: 100%;" id="mt-2" type="text" class="form-control"></td>
          <td><input style="width: 100%;" id="mt-3" type="text" class="form-control"></td>
          <td><input style="width: 100%;" id="mt-4" type="text" class="form-control"></td>
          <td><input style="width: 100%;" id="mt-5" type="text" class="form-control"></td>
          <td><input style="width: 100%;" id="mt-6" type="text" class="form-control"></td>
          <td><input style="width: 100%;" id="mt-7" type="text" class="form-control"></td>
          <td><input style="width: 100%;" class="btn btn-primary" onclick="act5_verify_obtable_1();" value="verify" style="width: 100%" type="button"></td>
      </tr>


      <tr>
      <td>1</td>
      <td>${obt_1_data[1][0]}</td>
      <td>${obt_1_data[1][1].toFixed(2)}</td>
      <td><input style="width: 100%;" id="mt-11" type="text" class="form-control"></td>
      <td><input style="width: 100%;" id="mt-12" type="text" class="form-control"></td>
      <td><input style="width: 100%;" id="mt-13" type="text" class="form-control"></td>
      <td><input style="width: 100%;" id="mt-14" type="text" class="form-control"></td>
      <td><input style="width: 100%;" id="mt-15" type="text" class="form-control"></td>
      <td><input style="width: 100%;" id="mt-16" type="text" class="form-control"></td>
      <td><input style="width: 100%;" id="mt-17" type="text" class="form-control"></td>
      <td><input style="width: 100%;" class="btn btn-primary" onclick="act5_verify_obtable_11();" value="verify" style="width: 100%" type="button"></td>
  </tr>
    </tbody>
    </table>

    </div>
    
    `;
    pp.clearleftpannel();
    pp.addtoleftpannel(main_table);
    let formula = `
    <p>Void Volume of Reactor, V (cm<sup>3</sup>) = 1102</p>
    <p>Volumetric Flow rate, v(cm<sup>3</sup>/min)</p>
    <p>&Delta;t = t<sub>i+1</sub> - t<sub>i</sub></p>
    <p>C<sub>i</sub> (ppm) = 0.64 x (k(i) - k(0))</p>
    <p>E(t) = C<sub>i</sub> / &Sigma;(C<sub>i</sub> x &Delta;t<sub>i</sub>)</p>
    <p>&tau;(sec)= volume of reactor x 60/flow rate</p>
    <p>E<sub>LFR</sub> = 0 &nbsp; if t &lt; &tau;/2</p>
    <p>E<sub>LFR</sub> = &tau;/2t<sup>2</sup> &nbsp; if t &ge; &tau;/2</p>
    `;
    if (document.getElementById('panel1_btn')) {
        document.getElementById('panel1_btn').remove();
    }
    pp.showdescription(formula, 3);
}
function add_readings(table, tau) {
    sum_c1_delta_t_1 = 0;
    sum_ci_ti_delta_t_1 = 0;
    sum_ci_ti_ti_delta_t_1 = 0;
    for (let i = 0; i < table.length; i++) {
        table[i][2] = 0.64 * (table[i][1] - table[0][1]);
        if (i < (table.length - 1)) {
            table[i + 1][3] = table[i + 1][0] - table[i][0];
        }
        if (i == 0) {
            table[i][3] = 0;
        }
        table[i][4] = table[i][3] * table[i][2];
        sum_c1_delta_t_1 += table[i][4];
        table[i][5] = table[i][0] * table[i][2] * table[i][3];
        sum_ci_ti_delta_t_1 += table[i][5];
    }
    for (let i = 0; i < table.length; i++) {
        table[i][6] = table[i][2] / sum_c1_delta_t_1;
        if (table[i][0] < tau / 2) {
            table[i][7] = 0;
        }
        else {
            table[i][7] = (Math.pow(tau, 2)) / (2 * (Math.pow(table[i][0], 3)));
        }
        table[i][8] = table[i][5] * table[i][0];
        sum_ci_ti_ti_delta_t_1 += table[i][8];
    }
    return table;
}
function calculate_sum_val_tab1() {
    sum_c1_delta_t_1 = 0;
    sum_ci_ti_delta_t_1 = 0;
    sum_ci_ti_ti_delta_t_1 = 0;
    for (let i = 0; i < obt_1_data.length; i++) {
        sum_c1_delta_t_1 += obt_1_data[i][4];
        sum_ci_ti_delta_t_1 += obt_1_data[i][5];
        sum_ci_ti_ti_delta_t_1 += obt_1_data[i][8];
    }
    t_bar_1 = sum_ci_ti_delta_t_1 / sum_c1_delta_t_1;
    sigma_1 = (sum_ci_ti_ti_delta_t_1 / sum_c1_delta_t_1) - (Math.pow(t_bar_1, 2));
    c = sigma_1 / Math.pow(t_bar_1, 2);
    root_1 = newton_raphson(a, b, c);
    let display_arr = [sum_c1_delta_t_1, sum_ci_ti_delta_t_1, sum_ci_ti_ti_delta_t_1, t_bar_1, sigma_1, root_1];
    console.log(display_arr);
}
function calculate_sum_val_tab2() {
    sum_c1_delta_t_2 = 0;
    sum_ci_ti_delta_t_2 = 0;
    sum_ci_ti_ti_delta_t_2 = 0;
    for (let i = 0; i < obt_2_data.length; i++) {
        sum_c1_delta_t_2 += obt_2_data[i][4];
        sum_ci_ti_delta_t_2 += obt_2_data[i][5];
        sum_ci_ti_ti_delta_t_2 += obt_2_data[i][8];
    }
    t_bar_2 = sum_ci_ti_delta_t_2 / sum_c1_delta_t_2;
    sigma_2 = (sum_ci_ti_ti_delta_t_2 / sum_c1_delta_t_2) - (Math.pow(t_bar_2, 2));
    c = sigma_2 / Math.pow(t_bar_2, 2);
    root_2 = newton_raphson(a, b, c);
    let display_arr = [sum_c1_delta_t_2, sum_ci_ti_delta_t_2, sum_ci_ti_ti_delta_t_2, t_bar_2, sigma_2, root_2];
    console.log(display_arr);
}
function act5_verify_obtable_1() {
    let val1 = document.getElementById("mt-1");
    let val2 = document.getElementById("mt-2");
    let val3 = document.getElementById("mt-3");
    let val4 = document.getElementById("mt-4");
    let val5 = document.getElementById("mt-5");
    let val6 = document.getElementById("mt-6");
    let val7 = document.getElementById("mt-7");
    console.log(parseFloat(val1.value));
    // console.log(Q.value, To.value, Ti.value, ti.value, to.value);
    if (!verify_values(parseFloat(val1.value), obt_1_data[0][2])) {
        console.log(parseFloat(val1.value), obt_1_data[0][2]);
        alert("please correct the Ci value");
        return;
    }
    if (!verify_values(parseFloat(val2.value), obt_1_data[0][3])) {
        alert("please correct the delta ti value");
        return;
    }
    if (!verify_values(parseFloat(val3.value), obt_1_data[0][4])) {
        alert("please correct the Ci delta ti value");
        return;
    }
    if (!verify_values(parseFloat(val4.value), obt_1_data[0][5])) {
        alert("please correct the Ci ti delta ti value");
        return;
    }
    if (!verify_values(parseFloat(val5.value), obt_1_data[0][6])) {
        alert("please correct the E(t) value");
        return;
    }
    if (!verify_values(parseFloat(val6.value), obt_1_data[0][7])) {
        alert("please correct the ELFR value");
        return;
    }
    if (!verify_values(parseFloat(val7.value), obt_1_data[0][8])) {
        alert("please correct the Ci ti^2 delta ti value");
        return;
    }
    // pp.addtorightpannel(act5_ob_btn, 3);
    alert("all values are correct");
    // complete_main_table_1();
    // var bsOffcanvas = new bootstrap.Offcanvas(
    //   document.getElementById("offcanvasRight3")
    // );
    // bsOffcanvas.show();
    first_row_verified = true;
}
function act5_verify_obtable_11() {
    let val1 = document.getElementById("mt-11");
    let val2 = document.getElementById("mt-12");
    let val3 = document.getElementById("mt-13");
    let val4 = document.getElementById("mt-14");
    let val5 = document.getElementById("mt-15");
    let val6 = document.getElementById("mt-16");
    let val7 = document.getElementById("mt-17");
    console.log(parseFloat(val1.value));
    // console.log(Q.value, To.value, Ti.value, ti.value, to.value);
    if (!verify_values(parseFloat(val1.value), obt_1_data[1][2])) {
        console.log(parseFloat(val1.value), obt_1_data[1][2]);
        alert("please correct the Ci value");
        return;
    }
    if (!verify_values(parseFloat(val2.value), obt_1_data[1][3])) {
        alert("please correct the delta ti value");
        return;
    }
    if (!verify_values(parseFloat(val3.value), obt_1_data[1][4])) {
        alert("please correct the Ci delta ti value");
        return;
    }
    if (!verify_values(parseFloat(val4.value), obt_1_data[1][5])) {
        alert("please correct the Ci ti delta ti value");
        return;
    }
    if (!verify_values(parseFloat(val5.value), obt_1_data[1][6])) {
        alert("please correct the E(t) value");
        return;
    }
    if (!verify_values(parseFloat(val6.value), obt_1_data[1][7])) {
        alert("please correct the ELFR value");
        return;
    }
    if (!verify_values(parseFloat(val7.value), obt_1_data[1][8])) {
        alert("please correct the Ci ti^2 delta ti value");
        return;
    }
    // pp.addtorightpannel(act5_ob_btn, 3);
    alert("all values are correct");
    if (first_row_verified) {
        complete_main_table_1();
        var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasRight3"));
        bsOffcanvas.show();
    }
    else {
        alert('You need to verify first row also!!');
        return;
    }
}
function complete_main_table_1() {
    document.getElementById('hide_panel3').click();
    pp.clearleftpannel();
    pp.addtoleftpannel(main_table);
    let tb = document.getElementById('table-5-body');
    tb.innerHTML = ``;
    document.getElementById('a5-temp').remove();
    for (let i = 0; i < obt_1_data.length; i++) {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${i + 1}</td>
        <td>${obt_1_data[i][0]}</td>
        <td>${obt_1_data[i][1].toFixed(2)}</td>
        <td>${obt_1_data[i][2].toFixed(2)}</td>
        <td>${obt_1_data[i][3]}</td>
        <td>${obt_1_data[i][4].toFixed(4)}</td>
        <td>${obt_1_data[i][5].toFixed(2)}</td>
        <td>${(obt_1_data[i][6].toFixed(6))}</td>
        <td>${(obt_1_data[i][7].toFixed(6))}</td>
        <td>${(obt_1_data[i][8]).toFixed(2)}</td>
        `;
        tb.append(row);
    }
    console.log('table loaded sccessfully!');
    let all_properties = `

<div style="overflow-y: auto !important; max-height: 80%;">
<table class="table" style="height: 30% !important;">
    <tbody>
      <tr>
        <td style="padding: 2% 2% !important; font-size: 13px" scope="row"><span style="border-top: 1px solid black;
        ">t</span> = </td>
        <td style="padding: 2% 2% !important; font-size: 12px">&Sigma;(C<sub>i</sub> x t<sub>i</sub> x &Delta;t<sub>i</sub>) / (C<sub>i</sub> x &Delta;t<sub>i</sub>)</td>
        
      </tr>
      <tr>
        <td style="padding: 2% 2% !important; font-size: 13px" scope="row">&sigma;<sup>2</sup> = </td>
        <td style="padding: 2% 2% !important; font-size: 12px">( &Sigma;(C<sub>i</sub> x t<sup>2</sup> x &Delta;t<sub>i</sub>) / (C<sub>i</sub> x &Delta;t<sub>i</sub>) ) - <span style="border-top: 1px solid black;
        ">t</span><sup>2</sup></td>
      </tr>
      <tr>
        <td style="padding: 2% 2% !important; font-size: 13px" scope="row">&sigma;<sup>2</sup> / <span style="border-top: 1px solid black;">t</span><sup>2</sup> = </td>
        <td style="padding: 2% 2% !important; font-size: 12px" colspan="2">2(D/uL) - 2(D/ul)<sup>2</sup> x (1 - e<sup>-(uL/D)</sup>)</td>
        
      </tr>

    </tbody>
  </table>

  <br>

  <div class="row" style="font-size: calc(0.7vw + 8px);"> 

  <div class="col-6">&Sigma; C<sub>i</sub> &Delta;t<sub>i</sub> => </div>  
  <div class="col-6"><input disabled value="${sum_c1_delta_t_1.toFixed(2)}" type="text" name="" id="act4-tab3-inp1"></div>

  <br>



  <div class="col-6">&Sigma; C<sub>i</sub> t<sub>i</sub> &Delta;t<sub>i</sub> => </div>  
  <div class="col-6"><input disabled value="${sum_ci_ti_delta_t_1.toFixed(2)}" type="text" id="act4-tab3-inp2"></div>

  <br>

  <div class="col-6">&Sigma; C<sub>i</sub> ti<sup>2</sup> &Delta;t<sub>i</sub> => </div>  
  <div class="col-6"><input disabled value="${sum_ci_ti_ti_delta_t_1.toFixed(2)}" type="text" name="" id="act4-tab3-inp3"></div>


  <br>

  <div class="col-6">Mean Residence Time, <span style="border-top: 1px solid black;
  ">t</span> => </div>  
  <div class="col-6"><input type="text" name="" id="act4-tab3-inp4"></div>

  <br>


  <div class="col-6">Varience, &sigma;<sup>2</sup> =></div>  
  <div class="col-6"><input type="text" name="" id="act4-tab3-inp5"></div>

  <br>


  <div class="col-6">Dispersion Number, (D/uL) <br>  (By trial and error) </div>  
  <div class="col-6"><input type="text" name="" id="act4-tab3-inp6"></div>

  </div>
  </div>
  

</div>


`;
    pp.showdescription(all_properties, 3);
    pp.addtorightpannel(verify_summations_btn, 3);
    // document.getElementById('panel1_btn').remove();
    // pp.addtorightpannel(act5_plot_btn, 3);
}
function verify_summations() {
    // let val1: HTMLInputElement = <HTMLInputElement>document.getElementById("act4-tab3-inp1");
    // let val2: HTMLInputElement = <HTMLInputElement>document.getElementById("act4-tab3-inp2");
    // let val3: HTMLInputElement = <HTMLInputElement>document.getElementById("act4-tab3-inp3");
    let val4 = document.getElementById("act4-tab3-inp4");
    let val5 = document.getElementById("act4-tab3-inp5");
    let val6 = document.getElementById("act4-tab3-inp6");
    // console.log(parseFloat(val1.value));
    // console.log(Q.value, To.value, Ti.value, ti.value, to.value);
    if (!verify_values(parseFloat(val4.value), t_bar_1)) {
        console.log("please correct the Mean Residence value");
        return;
    }
    if (!verify_values(parseFloat(val5.value), sigma_1)) {
        console.log("please correct the Varience value");
        return;
    }
    if (!verify_values(parseFloat(val6.value), root_1)) {
        console.log("please correct the dispersion value value");
        return;
    }
    // pp.addtorightpannel(act5_ob_btn, 3);
    document.getElementById('panel1_btn').remove();
    // var bsOffcanvas = new bootstrap.Offcanvas(
    //   document.getElementById("offcanvasRight3")
    // );
    // bsOffcanvas.show();
    complete_main_table_2();
}
//# sourceMappingURL=activity4.js.map