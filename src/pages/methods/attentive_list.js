
export function attentiveList(poseMap, attentiveSet) {
    // we take in the poseMap and return a Map <int, int> where the key is the keypoint and the value is the score (1 if keypoint.score > 0.8 else 0)
    var hash = {};
    
    for (var i = 0; i < poseMap.length; i++) {
        if ( attentiveSet.has(i) ) {
            var value = poseMap["keypoints"][i]["score"] < 0.8 ? 1 : 0;
            hash[i] = value;
        }
    }
    return hash;
}