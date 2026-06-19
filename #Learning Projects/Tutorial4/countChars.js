exports.countChars = async (char, string)=>{
    return string.split(char).length - 1;
};