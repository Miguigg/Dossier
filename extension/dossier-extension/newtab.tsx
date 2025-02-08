import { useState } from "react";
import { useFirebase } from "~firebase/hook"
import { useFirestoreDoc } from "~firebase/use-firestore-doc"
import {
  User,
  signInWithEmailAndPassword 
} from "firebase/auth"
import { auth } from "~firebase"

export default function IndexNewtab() {
  const { isLoading, onLogin, onLogout } = useFirebase()
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [user, setUser] = useState<User>(null)
  
  // Create a test collection, with a hello document:
  const { data: enterpriseData, setData } = useFirestoreDoc<{
    serial: string
  }>("starships/enterprise")

  const { data: crewData, setData: setCrewData } = useFirestoreDoc<{
    name: string
  }>(user?.uid && `crews/${user.uid}`)

  const signIn = (e) => {
    e.preventDefault();
      signInWithEmailAndPassword(auth, email, passwd)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user)
      })
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        gap: 4
      }}>
      <h1>
        Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
      </h1>
      {!user ? (
        <div>
          <form onSubmit={signIn}>
            <label htmlFor="email" className="form-label mt-2 text-color">Tu email</label>
            <input type="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)} id="email" placeholder="Enter your email" />
            <label htmlFor="password" className="form-label text-color">Contraseña</label>
            <input type="password" className="form-control" value={passwd} id="password"  onChange={(e)=> setPasswd(e.target.value)} placeholder="Enter your password" />
            <button type="submit" className="btn btn-primary w-100 mt-3 text-color">Login</button>
          </form>
        </div>
      ) : (
        <button onClick={() => onLogout()}>Log out</button>
      )}
      <div>
        {isLoading ? "Loading..." : ""}
        {!!user ? (
          <div>
            Welcome to Plasmo, {user.displayName} your email address is{" "}
            {user.email}
          </div>
        ) : (
          ""
        )}
      </div>
      <h2>Ship serial numberA:</h2>
      <input
        value={enterpriseData?.serial || ""}
        onChange={(e) =>
          setData({
            serial: e.target.value
          })
        }
      />

      <br />
      <h3>Crew name:</h3>
      <input
        value={crewData?.name || ""}
        onChange={(e) =>
          setCrewData({
            name: e.target.value
          })
        }
      />
    </div>
  )
}
