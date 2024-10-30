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
    "SELECT messages.id, messages.title, messages.message, messages.timestamp, members.firstname, members.lastname FROM messages JOIN members ON messages.user_id = members.id ORDER BY messages.timestamp DESC"
  );

  const formattedMessages = rows.map((message) => ({
    ...message,
    timestamp: formatDate(message.timestamp),
  }));
  return formattedMessages;
}

async function addNewMessage(userId, title, message) {
  await pool.query(
    "INSERT INTO messages (user_id, title, message) VALUES ($1, $2, $3)",
    [userId, title, message]
  );
}

async function deleteMessage(messageId) {
  await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
}

module.exports = {
  getAllMessages,
  addNewMessage,
  deleteMessage,
};
