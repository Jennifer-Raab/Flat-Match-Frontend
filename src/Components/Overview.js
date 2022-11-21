export default function Overview({ user }) {

    console.log("User", user);
  return (
    <div>
        <h1>Übersicht {user.username}</h1>
    </div>
  )
}