import House from "../models/House";
import Reserva from "../models/Reserva";
import User from "../models/User";

class ReserveController{

 async index(req, res){

  const { user_id } = req.headers;

  const reserve = await Reserva.find({ user: user_id}).populate('house');

  return res.json(reserve);

 }
  
  async store(req, res){
    
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    const house = await House.findById(house_id);

    if(!house){
      return res.status(400).json({ error: 'Essa casa nao existe. '});
    }

    if(house.status !== true){
      return res.status(400).json({ error: 'Solicitação Indisponível. '});
    }

    const user = await User.findById(user_id);
    if(String(user._id) === String(house.user)){
      return res.status(401).json({ error: 'Reserva não permitida. '});
    }

    const reserve = await Reserva.create({
      user: user_id,
      house: house_id,
      date,
    });
    
    const populateReserve = await Reserva.findOne({ _id: reserve._id})
    .populate('user')
    .populate('house')
    .exec();

    return res.json(populateReserve);

  }

  async destroy(req, res){
    
    const { reserve_id } = req.headers;
    
    await Reserva.findByIdAndDelete({ _id: reserve_id});

    return res.send();
  }

}

export default new ReserveController();