export function validateRequest({ body, query, params } = {}) {
    return (req, res, next) => {
        const errors = [];
        req.validated = {};

        if (body) {
            const result = body.safeParse(req.body)

            if (!result.success) {
                errors.push(
                    ...result.error.issues.map((e) => ({
                        location: "body",
                        field: e.path.join('.'),
                        message: e.message,
                    }))
                )
            } else {
                req.validated.body = result.data
            }
        }

        if (query) {
            const result = query.safeParse(req.query)

            if (!result.success) {
                errors.push(
                    ...result.error.issues.map((e) => ({
                        location: 'query',
                        field: e.path.join('.'),
                        message: e.message,
                    }))
                )
            } else {
                req.validated.query = result.data
            }
        }

        if (params) {
            const result = params.safeParse(req.params)

            if (!result.success) {
                errors.push(
                    ...result.error.issues.map((e) => ({
                        location: 'params',
                        field: e.path.join('.'),
                        message: e.message,
                    }))
                )
            } else {
                req.validated.params = result.data
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors })
        }

        next()
    }
}