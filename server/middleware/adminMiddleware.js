const adminMiddleware = (req, res, next) => {
    console.log("========== ADMIN ==========");
    console.log(req.user);

    if (!req.user) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access Denied. Admin Only.",
        });
    }

    next();
};

export default adminMiddleware;