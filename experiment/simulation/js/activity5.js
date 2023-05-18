var verify_summations_btn_2 = `<button id="panel1_btn" class="btn btn-primary" onclick="verify_summations_2();" style="position: absolute; bottom: 12vh; width: 90%;"> Display Observation Table</button>`;
function complete_main_table_2() {
    document.getElementById('hide_panel3').click();
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.showtitle("Repeat Calculations for flow rate  = 400 cm<sup>3</sup>/min", 3);
    pp.addtoleftpannel(main_table);
    let tb = document.getElementById('table-5-body');
    tb.innerHTML = ``;
    document.getElementById('a5-temp').remove();
    for (let i = 0; i < 20; i++) {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${i + 1}</td>
        <td>${obt_2_data[i][0]}</td>
        <td>${obt_2_data[i][1]}</td>
        <td>${obt_2_data[i][2].toFixed(2)}</td>
        <td>${obt_2_data[i][3]}</td>
        <td>${obt_2_data[i][4].toFixed(4)}</td>
        <td>${obt_2_data[i][5].toFixed(2)}</td>
        <td>${(obt_2_data[i][6].toFixed(6))}</td>
        <td>${(obt_2_data[i][7].toFixed(6))}</td>
        <td>${(obt_2_data[i][8]).toFixed(2)}</td>
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
  <div class="col-6"><input type="text" name="" id="act4-tab3-inp1"></div>

  <br>



  <div class="col-6">&Sigma; C<sub>i</sub> t<sub>i</sub> &Delta;t<sub>i</sub> => </div>  
  <div class="col-6"><input type="text" id="act4-tab3-inp2"></div>

  <br>

  <div class="col-6">&Sigma; C<sub>i</sub> ti<sup>2</sup> &Delta;t<sub>i</sub> => </div>  
  <div class="col-6"><input type="text" name="" id="act4-tab3-inp3"></div>


  <br>

  <div class="col-6">Mean Residence Time, <span style="border-top: 1px solid black;
  ">t</span> => </div>  
  <div class="col-6"><input type="text" name="" id="act4-tab3-inp4"></div>

  <br>


  <div class="col-6">Varience, &sigma;<sup>2</sup> =></div>  
  <div class="col-6"><input type="text" name="" id="act4-tab3-inp5"></div>

  <br>


  <div class="col-6">Dispersion Number, (D/uL) <br>  (By trial and error)</div>  
  <div class="col-6"><input type="text" name="" id="act4-tab3-inp6"></div>

  </div>
  </div>
  

</div>


`;
    pp.showdescription(all_properties, 3);
    pp.addtorightpannel(verify_summations_btn_2, 3);
    // document.getElementById('panel1_btn').remove();
    // pp.addtorightpannel(act5_plot_btn, 3);
}
function verify_summations_2() {
    let val1 = document.getElementById("act4-tab3-inp1");
    let val2 = document.getElementById("act4-tab3-inp2");
    let val3 = document.getElementById("act4-tab3-inp3");
    let val4 = document.getElementById("act4-tab3-inp4");
    let val5 = document.getElementById("act4-tab3-inp5");
    let val6 = document.getElementById("act4-tab3-inp6");
    console.log(parseFloat(val1.value));
    // console.log(Q.value, To.value, Ti.value, ti.value, to.value);
    if (!verify_values(parseFloat(val1.value), sum_c1_delta_t_2)) {
        console.log("please correct the summaton of c1 delta t1 value");
        return;
    }
    if (!verify_values(parseFloat(val2.value), sum_ci_ti_delta_t_2)) {
        console.log("please correct the summaton of c1 t1 delta t1 value");
        return;
    }
    if (!verify_values(parseFloat(val3.value), sum_ci_ti_ti_delta_t_2)) {
        console.log("please correct the summaton of c1 t1^2 delta t1 value");
        return;
    }
    if (!verify_values(parseFloat(val4.value), t_bar_2)) {
        console.log("please correct the Mean Residence value");
        return;
    }
    if (!verify_values(parseFloat(val5.value), sigma_2)) {
        console.log("please correct the Varience value");
        return;
    }
    if (!verify_values(parseFloat(val6.value), root_2)) {
        console.log("please correct the dispersion value value");
        return;
    }
    // pp.addtorightpannel(act5_ob_btn, 3);
    alert('all values entered are correct');
    activity6();
}
//# sourceMappingURL=activity5.js.map