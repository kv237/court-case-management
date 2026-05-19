function StatusTracking() {

  const status = [

    "Case Filed",

    "Documents Verified",

    "Under Process",

    "Sent To Judge",

    "Closed",

  ];

  return (

    <div className="min-h-screen bg-gray-100 p-5">

      <h1 className="text-3xl font-bold mb-5">

        Status Tracking

      </h1>

      <div className="bg-white rounded-3xl p-5 shadow-sm">

        {

          status.map((item, index) => (

            <div
              key={index}
              className="flex items-center gap-4 mb-5"
            >

              <div className="w-5 h-5 rounded-full bg-blue-600" />

              <p className="font-semibold">

                {item}

              </p>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default StatusTracking;