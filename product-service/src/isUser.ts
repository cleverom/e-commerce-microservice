import jwt from "jsonwebtoken";

export async function isUser(req: { headers: { [x: string]: string; }; user: any; }, res: { json: (arg0: { message: any; }) => any; }, next: () => void) {
    const token = req.headers["authorization"].split(" ")[1];

    jwt.verify(token, "secret", (err: any, user: any) => {
        if (err) {
            return res.json({ message: err });
        } else {
            req.user = user;
            next();
        }
    });

};