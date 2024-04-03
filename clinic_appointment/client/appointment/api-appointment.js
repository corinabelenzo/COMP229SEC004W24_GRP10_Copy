const create = async (user) => {
    try {
      let response = await fetch("/api/appointments/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  const list = async (signal) => {
    try {
        let response = await fetch('/api/appointments/', {
            method: 'GET',
            signal: signal,
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const read = async (params, credentials, signal) => {
    try {
      let response = await fetch("/api/appointments/" + params.userId, {
        method: "GET",
        signal: signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  const remove = async (params, credentials) => {
    try {
        let response = await fetch('/api/appointments/' + params.appointmentId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}

  export {create, list, read,remove};