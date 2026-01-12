const API_BASE = "http://localhost:3000/api";

// 取得所有比賽
async function getCompetitions() {
  const res = await fetch(`${API_BASE}/competitions`);
  return res.json();
}

// 取得某比賽的報名名單 ⭐（你之前缺的）
async function getRegistrationsByCompetition(competitionId) {
  const res = await fetch(
    `${API_BASE}/registrations/competition/${competitionId}`
  );
  return res.json();
}

// 新增報名
async function createRegistration(data) {
  const res = await fetch(`${API_BASE}/registrations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
}

// 新增比賽
async function createCompetition(data) {
  const res = await fetch(`${API_BASE}/competitions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
}

// 刪除報名
async function deleteRegistration(id) {
  const res = await fetch(`${API_BASE}/registrations/${id}`, {
    method: "DELETE"
  });
  return res.json();
}
