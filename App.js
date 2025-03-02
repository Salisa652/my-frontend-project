import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:3000/getpatients/");
      setPatients(res.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const fetchPatientDetails = async (id) => {
    try {
      const res = await axios.get(`http://127.0.0.1:3000/getpatient/${id}`);
      setSelectedPatient(res.data[0]);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ระบบติดตามฟื้นตัวหลังผ่าตัดหัวใจ</h1>
      
      {/* รายชื่อผู้ป่วย */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {patients.map((patient) => (
          <div key={patient.patient_id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{patient.name}</h2>
            <p>อายุ: {patient.age} ปี</p>
            <p>สถานะ: {patient.status}</p>
            <button 
              onClick={() => fetchPatientDetails(patient.patient_id)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              ดูรายละเอียด
            </button>
          </div>
        ))}
      </div>

      {/* รายละเอียดของผู้ป่วย */}
      {selectedPatient && (
        <div className="mt-6 p-4 border rounded-lg shadow-md bg-gray-100">
          <h2 className="text-xl font-bold">รายละเอียดของ {selectedPatient.name}</h2>
          <p>อายุ: {selectedPatient.age} ปี</p>
          <p>โรคประจำตัว: {selectedPatient.medical_history}</p>
          <p>วันที่ผ่าตัด: {selectedPatient.surgery_date}</p>
          <p>การฟื้นตัว: {selectedPatient.recovery_status}</p>
          <button 
            onClick={() => setSelectedPatient(null)}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            ปิด
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
