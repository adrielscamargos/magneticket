import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

function App() {

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  // process CSV data
  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    } 
    
    // prepare columns list from headers
    const columns = headers.map(c => ({
      name: c,
      selector: c,
    }));

    setData(list);
    setColumns(columns);
  }

  // handle file upload
  const handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary', codepage: 65001 });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  }

  const handleSubmit = (event) => {
       event.preventDefault();
       data.forEach((dt) => {
        const pergunta = dt ? dt.pergunta : '';
        const resposta = dt ? dt.resposta : '';
        const datapost = {
          pergunta : pergunta,
          resposta : resposta
        }
        axios.post(baseUrl + "/perguntas/create",datapost)
        .then(response=>{
          if (response.data.success===true) {
            alert(response.data.message)
          }
          else {
            alert(response.data.message)
          }
        }).catch(error=>{
          alert("Error 34 "+ error)
        })            
      });
   }

  return (
    <div>
      <h2>Importe Perguntas em Massa</h2>
      <hr></hr>

      <h5>Modelo CSV (separado por ;)</h5>
      <p>pergunta;resposta<br></br>
      oi, tudo bem?;tudo bem!<br></br>
      olá!;oi, tudo certo por aí?</p>

      <hr></hr>
      <br></br>
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}
      />
      <DataTable
        pagination
        highlightOnHover
        columns={columns}
        data={data}
      />
      <form onSubmit={handleSubmit}>
      <button type="submit" className="btn btn-primary">Importar</button>
      {/* <input 
		style={{ color:"white", backgroundColor:"#f50057", borderColor:"#f50057", borderRadius: "4px", padding: "10px" }}
		type="submit" 
		value="Importar"
	    /> */}
      </form>
    </div>
  );
}
  
export default App;