const pool = require("./db");

function formatDate(date) {
  const newDate = new Date(date);

  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = newDate.toLocaleString("en-US", dateOptions);

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedTime = newDate.toLocaleString("en-US", timeOptions);
  return { formattedDate, formattedTime };
}

async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT messages.id, messages.title, messages.message, messages.timestamp, members.firstname, members.lastname FROM messages JOIN members ON messages.user_id = members.id"
  );

  const formattedMessages = rows.map((message) => ({
    ...message,
    timestamp: formatDate(message.timestamp),
  }));
  return formattedMessages;
}

module.exports = {
  getAllMessages,
};
