const supabase =
require("../config/supabase");



const createAuditLog =
async (
  user_id,
  action,
  module
) => {

  try {

    await supabase

      .from("audit_logs")

      .insert([
        {
          user_id,
          action,
          module,
        },
      ]);

  } catch (error) {

    console.log(
      "Audit Log Error:",
      error.message
    );

  }

};

module.exports =
createAuditLog;