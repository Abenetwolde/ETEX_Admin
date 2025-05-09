import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

// Base API setup with RTK Query
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://172.20.83.54:3000/', // Replace with your backend API URL
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).admin.token;
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    }
  }),
  tagTypes: ['Questions', 'MiniPrizes', 'GrandPrizes', 'EligibleParticipants'],
  endpoints: () => ({}) // Endpoints will be injected by services
});

// Sample service for backend API calls
export const backendApi = usersApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all questions
    getQuestions: builder.query<Question[], void>({
      query: () => 'questions',
      providesTags: ['Questions']
    }),
    // Create a new question
    createQuestion: builder.mutation<Question, CreateQuestionRequest>({
      query: (body) => ({
        url: 'questions',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Questions']
    }),
    // Update a question (with optimistic update)
    updateQuestion: builder.mutation<
      Question,
      { id: number; body: UpdateQuestionRequest }
    >({
      query: ({ id, body }) => ({
        url: `questions/${id}`,
        method: 'PUT',
        body
      }),
      // Optimistic update logic
      async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          backendApi.util.updateQueryData(
            'getQuestions',
            undefined,
            (draft) => {
              const question = draft.find((q) => q.id === id);
              if (question) {
                Object.assign(question, body.question);
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Questions']
    }),
    // Delete a question
    deleteQuestion: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `questions/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Questions']
    }),

    loginAdmin: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'admin_auth',
        method: 'POST',
        body: credentials
      })
    }),
    getUsers: builder.query<{ id: number; name: string }[], void>({
      query: () => 'users' // GET request to /users
    }),
    getUserById: builder.query<{ id: number; name: string }, number>({
      query: (id) => `users/${id}` // GET request to /users/:id
    }),
    // New endpoints for Mini Prizes
    getMiniPrizes: builder.query<RewardItem[], void>({
      query: () => 'miniprizes',
      providesTags: ['MiniPrizes']
    }),
    createMiniPrize: builder.mutation<RewardItem, CreateRewardItemRequest>({
      query: (body) => ({
        url: 'miniprizes',
        method: 'POST',
        body
      }),
      invalidatesTags: ['MiniPrizes']
    }),
    updateMiniPrize: builder.mutation<
      RewardItem,
      { id: number; body: UpdateMiniPrizeRequest }
    >({
      query: ({ id, body }) => ({
        url: `miniprizes/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['MiniPrizes']
    }),

    // New endpoints for Grand Prizes
    getGrandPrizes: builder.query<RewardItem[], void>({
      query: () => 'grandprizes',
      providesTags: ['GrandPrizes']
    }),
    createGrandPrize: builder.mutation<RewardItem, CreateRewardItemRequest>({
      query: (body) => ({
        url: 'grandprizes',
        method: 'POST',
        body
      }),
      invalidatesTags: ['GrandPrizes']
    }),
    updateGrandPrize: builder.mutation<RewardItem, CreateRewardItemRequest>({
      query: ({ id, body }: any) => ({
        url: `grandprizes/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['GrandPrizes']
    }),
    deleteGrandPrize: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `grandprizes/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['GrandPrizes']
    }),
    deleteMiniPrize: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `miniprizes/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['MiniPrizes']
    }),
    // New endpoint for eligible participants
    getEligibleParticipants: builder.query<{ eligible_users: any[] }, void>({
      query: () => 'mini_lottery/eligible',
      providesTags: ['EligibleParticipants']
    })
  })
});

// Export hooks for usage in components
export const {
  useGetQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useLoginAdminMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetMiniPrizesQuery,
  useCreateMiniPrizeMutation,
  useUpdateMiniPrizeMutation,
  useGetGrandPrizesQuery,
  useCreateGrandPrizeMutation,
  useDeleteGrandPrizeMutation,
  useDeleteMiniPrizeMutation,
  useUpdateGrandPrizeMutation,
  useGetEligibleParticipantsQuery
} = backendApi;
