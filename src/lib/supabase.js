import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://uzgtcfzblwnjjdtssjmi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6Z3RjZnpibHduampkdHNzam1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI1MjgxMzYsImV4cCI6MjAxODEwNDEzNn0.Lz3E6YxV81ie_MAQCbNBwlM9AqInHEXEknw-l6Bs94A')


// import { createClient } from '@supabase/supabase-js'

// export const supabase = createClient('https://uzgtcfzblwnjjdtssjmi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6Z3RjZnpibHduampkdHNzam1pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjUyODEzNiwiZXhwIjoyMDE4MTA0MTM2fQ.iTlmzh0vKq_4AtVuOc84rNJ55t0WIO45quQ717xjdEU', {
//   auth: {
//     autoRefreshToken: false,
//     persistSession: false
//   }
// })

// Access auth admin api
// const adminAuthClient = supabase.auth.admin

