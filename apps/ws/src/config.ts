import dotenv from "dotenv";
import path from "path";

// Load environment variables from the file specified in ENV_FILE_PATH, 
// or fallback to the default .env in the project root (../../.env from apps/ws/src)
const envPath = process.env.ENV_FILE_PATH || path.resolve(__dirname, "../../../.env");

dotenv.config({ path: envPath });
