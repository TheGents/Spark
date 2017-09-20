module.exports = {
    //CRUD - Create - Read - Update - Destory
    // POST - PUT - GET - DELETE
    post_match: (req,res) => {
        const db = req.app.get('db');
        const { her_id, his_id, gender, chick_swipe, dude_swipe } = req.body;
        if(gender === 0) { 
            db.post_match_his([her_id, his_id, dude_swipe]).then(()=>res.status('200').send()).catch(()=> res.status.send('404'));
        }
        if(gender === 1) {
            db.post_match_hers([her_id, his_id, chick_swipe]).then(()=>res.status('200').send()).catch(()=> res.status.send('404'));
        }
    },
    get_user_profile: (req,res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        db.get_user_profile([id]).then((data)=>res.status('200').send(data)).catch(()=> res.status('404').send());
    },
    get_user_preferences: (req,res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        db.get_user_preferences([id]).then((data)=>res.status('200').send(data)).catch(()=> res.status('404').send());
    },
    get_shopping: (req,res) => {
        const db = req.app.get('db');
        let gender = req.params.gender;
        if(gender === '1') {
            db.get_dudes([gender]).then((data)=>res.status('200').send(data)).catch(()=> res.status('404').send());
        }
        if(gender === '0' ) {
            db.get_chicks([gender]).then((data)=>res.status('200').send(data)).catch(()=> res.status('404').send());
        }
    },
    get_matches: (req,res) => {
        const db = req.app.get('db');
        const { gender } = req.body;
        db.get_matches([gender]).then((data)=>res.status('200').send(data)).catch(()=>res.status('404').send());
        // const { id, gender } = req.body;
        // if(gender === 0 ) { 
        //     db.get_his_matches([id]).then((data)=>res.status('200').send(data)).catch(()=> res.status('404').send());
        // }
        // if(gender === 1) {
        //     db.get_her_matches([id]).then((data)=>res.status('200').send(data)).catch(()=> res.status('404').send());
        // }
    },
    put_user_profile: (req,res) => {
        const db = req.app.get('db');
        const { facebook_auth_id , first_name, school, occupation, location, gender, age, facebook_pic, general_bio } = req.body;
        db.put_user_profile([facebook_auth_id , first_name, school, occupation, location, gender, age, facebook_pic, general_bio]).then((data)=>res.status('200').send(data)).catch(()=> res.status('404').send());
    },
    put_user_preferences: (req,res) => {
        const db = req.app.get('db');
        const { facebook_auth_id, dist_min, dist_max, age_min, age_max } = req.params;
        db.put_user_preferences([facebook_auth_id, dist_min, dist_max, age_min, age_max]).then((data)=>res.status('200').send(data)).catch(()=> res.status('404').send());
    },
    put_match: (req,res) => {
        const db = req.app.get('db');
        const { id, gender } = req.body;
        if(gender === 0) { 
            db.put_match_his([id, dude_swipe]).then((data)=>res.status('200').send(data)).catch(()=> res.status.send('404'));
        }
        if(gender === 1) {
            db.put_match_hers([id, chick_swipe]).then((data)=>res.status('200').send(data)).catch(()=> res.status.send('404'));
        }
    },
    delete_match: (req,res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        db.delete_match([id]).then((data)=>res.status('200').send(data)).catch(()=> res.status('404').send());
    },
    delete_user_account: (req,res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        db.get_user_profile([id]).then(()=>res.status('200').send()).catch(()=> res.status('404').send());
    },
    
}