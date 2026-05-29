import GitHubProvider from 'next-auth/providers/github'
import NextAuth from 'next-auth'

export default NextAuth({
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.id = account.providerAccountId
			}
			return token
		},
		async session({ session, token }) {
			session.user.id = token.id as string
			return session
		},
	},
})
