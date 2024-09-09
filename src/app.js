import { createClient } from "@supabase/supabase-js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/getReceipts", async (req, res) => {
  let { data, error } = await supabase.from("reciepts").select("*");
  if (error) {
    return res.status(500).send("Something went wrong", error);
  } else {
    return res.send(data);
  }
});

app.post("/postReceipts", async (req, res) => {
  const { event, transaction_id, amount_paid } = req.body;

  const { data, error } = await supabase
    .from("reciepts")
    .insert([
      {
        event: event,
        transaction_id: transaction_id,
        amount_paid: amount_paid,
      },
    ])
    .select();

  if (error) {
    res.status(500).send("Error inserting data", error);
  } else {
    res.send("Data added !");
  }
});

app.listen(process.env.PORT_NUM, () => {
  console.log(`Server at ${process.env.PORT_NUM}`);
});
