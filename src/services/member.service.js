import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { signinResponseDTO } from "../dtos/member.dto"
import { addMember, getMember, getMemberPreferToMemberID, setPrefer } from "../models/member.dao";

export const joinMember = async (body) => {
    const {email, name, birthYear, birthMonth, birthDay, addr, phone} = body;
    const birth = new Date(birthYear, birthMonth, birthDay);
    const prefer = body.prefer;

    const joinMemberData = await addMember({
        'email': email,
        'name': name,
        'gender': gender,
        'birth': birth,
        'addr': addr,
        'phone': phone,
        "prefer": pefer
    });

    if(joinMemberData == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        for (let i = 0; i < prefer.length; i++) {
            await setPrefer(joinMemberData, prefer[i]);
        }
        return signinResponseDTO(await getMember(joinMemberData), await getMemberPreferToMemberID(joinMemberData));
    }
}