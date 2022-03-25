export const getChatMessages = state => state.chatMessages || [];
export const getTranscript = state => state.transcripts?.list | [];
export const getTranscriptState = state => state.transcripts?.state;
