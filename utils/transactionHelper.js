import { startSession } from "mongoose";

const runTransaction = async (transactionCallback) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const result = await transactionCallback(session);
    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export default runTransaction;
