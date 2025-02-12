export const unitSearch = async (req, res) => {
    try {
      let {searchQuery, page = 1, limit = 12} = req.query
      page = Number(page)
      limit = Number(limit)
      const offset = (page - 1) * limit
      const whereConditions = []
      const replacements = {}
      if(searchQuery && searchQuery !== "''" && searchQuery !== '""') {
        whereConditions.push(`u."title" ~* :searchQuery`)
        whereConditions.push(`u.type ~* :searchQuery`)
        whereConditions.push(`u.code ~* :searchQuery`)
        whereConditions.push(`usr."fullName" ~* :searchQuery`)
        replacements["searchQuery"] = `.*${searchQuery}.*`
      }
      const rawQuery = `
        SELECT 
          u.*,
          jsonb_build_object(
            'id', usr.id,
            'fullName', usr."fullName",
            'role', usr.role,
            'email', usr.email,
            'phone_number', usr.phone_number
          ) AS author_data
        FROM 
          "units" u
        LEFT JOIN 
          "users" usr
        ON 
          u."author" = usr."id"::TEXT
        ${whereConditions.length > 0 ? `
          WHERE ${whereConditions.join(' OR ')} 
          ${req?.user?.role === 3 ? `AND (u.author = ${req?.user?.id}::TEXT)` : ``}
        ` : `${req?.user?.role === 3 ? `WHERE u.author = ${req?.user?.id}::TEXT` : ``}`}
        ORDER BY u."createdAt" DESC
        LIMIT :limit OFFSET :offset
      `;
      const totalSQL = `
        SELECT 
          COUNT(*)
        FROM 
          "units" u
        LEFT JOIN 
          "users" usr
        ON 
          u."author" = usr."id"::TEXT
        ${whereConditions.length > 0 ? `
          WHERE ${whereConditions.join(' OR ')} 
          ${req?.user?.role === 3 ? `AND (u.author = ${req?.user?.id}::TEXT)` : ``}
        ` : `${req?.user?.role === 3 ? `WHERE u.author = ${req?.user?.id}::TEXT` : ``}`}
      `;
      const [data, totalData] = await Promise.all([
        sequelize.query(rawQuery, {
          type: Sequelize.QueryTypes.SELECT,
          replacements: {...replacements, limit, offset}
        }),
        sequelize.query(totalSQL, {
          type: Sequelize.QueryTypes.SELECT,
          replacements
        })
      ])
      return res.json({success: true, data, meta: {page, limit, totalData: Number(totalData[0]?.count)}})
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }