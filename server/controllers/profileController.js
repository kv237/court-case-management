// server/controllers/profileController.js

const bcrypt =
  require("bcryptjs");

const generateOTP =
  require("../utils/generateOTP");

const sendOTP =
  require("../utils/sendOTP");

const supabase =
  require("../config/supabaseClient");

/* SEND PASSWORD OTP */

exports.sendPasswordOTP =
  async (req, res) => {
    try {
      const {
        currentPassword,
        newPassword,
      } = req.body;

      if (
        !currentPassword ||
        !newPassword
      ) {
        return res.status(400).json({
          message:
            "Missing required fields",
        });
      }

      const otp = generateOTP();

      const hashedOTP =
        await bcrypt.hash(otp, 10);

      const expiresAt = new Date(
        Date.now() + 5 * 60 * 1000
      );

      await supabase
        .from("profile_otps")
        .insert([
          {
            user_id: req.user.id,

            type: "password",

            otp: hashedOTP,

            target_value:
              newPassword,

            expires_at: expiresAt,
          },
        ]);

      await sendOTP(
        req.user.email,
        otp
      );

      return res.json({
        message:
          "OTP sent successfully",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message:
          "Server error",
      });
    }
  };

/* VERIFY PASSWORD OTP */

exports.verifyPasswordOTP =
  async (req, res) => {
    try {
      const { otp } = req.body;

      const { data } =
        await supabase
          .from("profile_otps")
          .select("*")
          .eq(
            "user_id",
            req.user.id
          )
          .eq("type", "password")
          .order(
            "created_at",
            { ascending: false }
          )
          .limit(1)
          .single();

      if (!data) {
        return res.status(404).json({
          message:
            "OTP not found",
        });
      }

      if (
        new Date(data.expires_at) <
        new Date()
      ) {
        return res.status(400).json({
          message:
            "OTP expired",
        });
      }

      const isMatch =
        await bcrypt.compare(
          otp,
          data.otp
        );

      if (!isMatch) {
        return res.status(400).json({
          message:
            "Invalid OTP",
        });
      }

      const { error } =
        await supabase.auth.admin.updateUserById(
          req.user.id,
          {
            password:
              data.target_value,
          }
        );

      if (error) {
        return res.status(400).json({
          message:
            error.message,
        });
      }

      await supabase
        .from("profile_otps")
        .delete()
        .eq("id", data.id);

      return res.json({
        message:
          "Password updated successfully",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message:
          "Server error",
      });
    }
  };

/* SEND EMAIL OTP */

exports.sendEmailOTP =
  async (req, res) => {
    try {
      const { email } = req.body;

      const otp = generateOTP();

      const hashedOTP =
        await bcrypt.hash(otp, 10);

      const expiresAt = new Date(
        Date.now() + 5 * 60 * 1000
      );

      await supabase
        .from("profile_otps")
        .insert([
          {
            user_id: req.user.id,

            type: "email",

            otp: hashedOTP,

            target_value: email,

            expires_at: expiresAt,
          },
        ]);

      await sendOTP(email, otp);

      return res.json({
        message: "OTP sent",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message:
          "Server error",
      });
    }
  };

/* VERIFY EMAIL OTP */

exports.verifyEmailOTP =
  async (req, res) => {
    try {
      const { otp } = req.body;

      const { data } =
        await supabase
          .from("profile_otps")
          .select("*")
          .eq(
            "user_id",
            req.user.id
          )
          .eq("type", "email")
          .order(
            "created_at",
            { ascending: false }
          )
          .limit(1)
          .single();

      if (!data) {
        return res.status(404).json({
          message:
            "OTP not found",
        });
      }

      const isMatch =
        await bcrypt.compare(
          otp,
          data.otp
        );

      if (!isMatch) {
        return res.status(400).json({
          message:
            "Invalid OTP",
        });
      }

      const { error } =
        await supabase.auth.admin.updateUserById(
          req.user.id,
          {
            email:
              data.target_value,
          }
        );

      if (error) {
        return res.status(400).json({
          message:
            error.message,
        });
      }

      await supabase
        .from("profile_otps")
        .delete()
        .eq("id", data.id);

      return res.json({
        message:
          "Email updated successfully",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message:
          "Server error",
      });
    }
  };

/* SEND PHONE OTP */

exports.sendPhoneOTP =
  async (req, res) => {
    try {
      const { phone } = req.body;

      const otp = generateOTP();

      const hashedOTP =
        await bcrypt.hash(otp, 10);

      const expiresAt = new Date(
        Date.now() + 5 * 60 * 1000
      );

      await supabase
        .from("profile_otps")
        .insert([
          {
            user_id: req.user.id,

            type: "phone",

            otp: hashedOTP,

            target_value:
              phone,

            expires_at: expiresAt,
          },
        ]);

      await sendOTP(
        req.user.email,
        otp
      );

      return res.json({
        message: "OTP sent",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message:
          "Server error",
      });
    }
  };

/* VERIFY PHONE OTP */

exports.verifyPhoneOTP =
  async (req, res) => {
    try {
      const { otp } = req.body;

      const { data } =
        await supabase
          .from("profile_otps")
          .select("*")
          .eq(
            "user_id",
            req.user.id
          )
          .eq("type", "phone")
          .order(
            "created_at",
            { ascending: false }
          )
          .limit(1)
          .single();

      if (!data) {
        return res.status(404).json({
          message:
            "OTP not found",
        });
      }

      const isMatch =
        await bcrypt.compare(
          otp,
          data.otp
        );

      if (!isMatch) {
        return res.status(400).json({
          message:
            "Invalid OTP",
        });
      }

      await supabase
        .from("profiles")
        .update({
          phone:
            data.target_value,
        })
        .eq("id", req.user.id);

      await supabase
        .from("profile_otps")
        .delete()
        .eq("id", data.id);

      return res.json({
        message:
          "Phone updated successfully",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message:
          "Server error",
      });
    }
  };